<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PoiApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\ZamboangaPoiSeeder::class);
    }

    public function test_api_health_endpoint_returns_ok(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'healthy',
                'app' => 'Hermosa-Tourism API',
            ]);
    }

    public function test_can_list_all_zamboanga_pois_with_distances(): void
    {
        $response = $this->getJson('/api/v1/pois?lat=6.9147&lng=122.0600');

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
                        'distanceKm',
                        'amenities',
                    ],
                ],
            ]);

        $data = $response->json('data');
        $this->assertCount(13, $data);
        // Closest to WMSU should be Masjid Baliwasan (~0.2 km)
        $this->assertEquals('Masjid Baliwasan (WMSU Campus Mosque)', $data[0]['name']);
    }

    public function test_can_filter_pois_by_category(): void
    {
        $response = $this->getJson('/api/v1/pois?category=dining');

        $response->assertStatus(200);
        $data = $response->json('data');
        $this->assertNotEmpty($data);
        foreach ($data as $poi) {
            $this->assertEquals('dining', $poi['category']);
        }
    }

    public function test_can_fetch_single_poi_details(): void
    {
        $response = $this->getJson('/api/v1/pois/poi-sadik-grand-mosque');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 'poi-sadik-grand-mosque',
                    'name' => 'Sadik Grand Mosque (Mercedes)',
                    'tier' => 'tier1',
                    'category' => 'worship',
                ],
            ]);
    }

    public function test_can_fetch_today_prayer_timings_and_qibla(): void
    {
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
        $this->assertGreaterThan(288, $qibla);
        $this->assertLessThan(292, $qibla);
    }

    public function test_can_submit_review_for_poi(): void
    {
        $payload = [
            'author_name' => 'Fatima Zahra',
            'rating' => 5,
            'comment' => 'Spacious and clean wudu stations, perfect for family prayer.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Clean Wudu', 'Spacious'],
        ];

        $response = $this->postJson('/api/v1/pois/poi-sadik-grand-mosque/reviews', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Review submitted successfully',
            ]);

        $this->assertDatabaseHas('reviews', [
            'author_name' => 'Fatima Zahra',
            'rating' => 5,
        ]);
    }
}
