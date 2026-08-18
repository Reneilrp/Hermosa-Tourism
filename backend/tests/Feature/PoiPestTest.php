<?php

use App\Models\Poi;
use Database\Seeders\ZamboangaPoiSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->seed(ZamboangaPoiSeeder::class);
});

test('api health endpoint returns healthy status', function () {
    $response = $this->getJson('/api/v1/health');

    $response->assertStatus(200)
        ->assertJson([
            'status' => 'healthy',
            'app' => 'Hermosa-Tourism API',
            'city' => 'Zamboanga City, Philippines',
        ]);
});

test('can retrieve all 16 authentic zamboanga pois via pest', function () {
    $response = $this->getJson('/api/v1/pois');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'category',
                    'tier',
                    'latitude',
                    'longitude',
                    'address',
                ],
            ],
        ]);

    expect($response->json('data'))->toHaveCount(16);
});

test('can sort pois by great-circle distance from wmsu campus', function () {
    // Coordinates near WMSU Normal Road: 6.9147, 122.0600
    $response = $this->getJson('/api/v1/pois?lat=6.9147&lng=122.0600');

    $response->assertStatus(200);
    $data = $response->json('data');

    // Closest place to WMSU should be Masjid Baliwasan
    expect($data[0]['name'])->toBe('Masjid Baliwasan (WMSU Campus Mosque)');
    expect($data[0]['distanceKm'])->toBeLessThan(0.5);
});

test('can filter pois by category worship', function () {
    $response = $this->getJson('/api/v1/pois?category=worship');

    $response->assertStatus(200);
    $data = $response->json('data');

    // Exactly 9 Mosques seeded in Zamboanga City
    expect($data)->toHaveCount(9);
    foreach ($data as $poi) {
        expect($poi['category'])->toBe('worship');
    }
});

test('can get today prayer times for zamboanga city with qibla bearing', function () {
    $response = $this->getJson('/api/v1/prayers/today?lat=6.9147&lng=122.0600');

    $response->assertStatus(200)
        ->assertJsonStructure([
            'success',
            'data' => [
                'timings' => ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'],
                'nextPrayer' => ['name', 'time', 'countdown'],
                'qiblaBearing',
                'location',
            ],
        ]);

    $qibla = $response->json('data.qiblaBearing');
    expect($qibla)->toBeGreaterThan(288);
    expect($qibla)->toBeLessThan(292);
});

test('can submit verified review for a poi', function () {
    $poi = Poi::first();

    $payload = [
        'author_name' => 'Dr. Amina Sali',
        'rating' => 5,
        'comment' => 'Meticulously maintained wudu facility and very peaceful prayer atmosphere in Zamboanga.',
        'verified_visit' => true,
        'verified_wudu' => true,
        'verified_female_area' => true,
        'dish_tags' => ['Clean Wudu', 'Peaceful Musalla'],
    ];

    $response = $this->postJson("/api/v1/pois/{$poi->custom_id}/reviews", $payload);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'Review submitted successfully',
        ]);

    $this->assertDatabaseHas('reviews', [
        'poi_id' => $poi->id,
        'author_name' => 'Dr. Amina Sali',
        'rating' => 5,
    ]);
});
