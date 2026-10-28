<?php

namespace Tests\Feature;

use App\Models\MsmeApplication;
use App\Models\Poi;
use Database\Seeders\ZambasultaRegionalSeeder;
use Database\Seeders\ZamboangaPoiSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MobileWebParitySmokeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(ZamboangaPoiSeeder::class);
        $this->seed(ZambasultaRegionalSeeder::class);
    }

    public function test_health_check_smoke(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'healthy',
                'app' => 'Hermosa-Tourism API',
            ])
            ->assertJsonStructure([
                'status',
                'app',
                'version',
                'regions',
                'timestamp',
            ]);
    }

    public function test_low_bandwidth_offline_sync_bundle(): void
    {
        $response = $this->getJson('/api/v1/sync/bundle');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'synced_at',
                'version',
                'pois',
                'ports',
                'routes',
                'prayers',
            ]);

        $bundle = $response->json();
        $this->assertNotEmpty($bundle['pois']);
        $this->assertIsArray($bundle['ports']);
        $this->assertIsArray($bundle['routes']);
    }

    public function test_poi_discovery_and_filtering_parity(): void
    {
        // 1. All POIs with coordinates at WMSU
        $res = $this->getJson('/api/v1/pois?lat=6.9147&lng=122.0600');
        $res->assertStatus(200);
        $pois = $res->json('data');
        $this->assertNotEmpty($pois);

        // Verify distanceKm is computed for each POI
        $this->assertNotNull($pois[0]['distanceKm']);

        // 2. Filter by worship category (Mosques)
        $worshipRes = $this->getJson('/api/v1/pois?category=worship');
        $worshipRes->assertStatus(200);
        foreach ($worshipRes->json('data') as $item) {
            $this->assertEquals('worship', $item['category']);
        }

        // 3. Filter by dining category
        $diningRes = $this->getJson('/api/v1/pois?category=dining');
        $diningRes->assertStatus(200);
        foreach ($diningRes->json('data') as $item) {
            $this->assertEquals('dining', $item['category']);
        }

        // 4. Filter by Tier 1 Certified Halal
        $tier1Res = $this->getJson('/api/v1/pois?tier=tier1');
        $tier1Res->assertStatus(200);
        foreach ($tier1Res->json('data') as $item) {
            $this->assertEquals('tier1', $item['tier']);
        }
    }

    public function test_poi_detail_with_halal_certification_and_amenities(): void
    {
        $firstPoi = Poi::first();
        $this->assertNotNull($firstPoi);

        $res = $this->getJson("/api/v1/pois/{$firstPoi->id}");
        $res->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'category',
                    'tier',
                    'certBody',
                    'certNumber',
                    'rating',
                    'reviewCount',
                    'amenities',
                ],
            ]);
    }

    public function test_place_review_submission_and_rating_recalculation(): void
    {
        $poi = Poi::first();

        $reviewData = [
            'author_name' => 'Ahmad bin Abdullah (Mobile Pilgrim)',
            'rating' => 5,
            'comment' => 'Authentic prayer space and wonderful hospitality during our Zamboanga visit.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Tiula Itum', 'Musalla Onsite'],
        ];

        $res = $this->postJson("/api/v1/pois/{$poi->id}/reviews", $reviewData);
        $res->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Review submitted successfully',
            ]);

        // Verify updated review count and average rating on POI
        $poi->refresh();
        $this->assertGreaterThan(0, $poi->review_count);
    }

    public function test_prayer_schedule_and_qibla_bearing(): void
    {
        $res = $this->getJson('/api/v1/prayers/today?lat=6.9147&lng=122.0600');
        $res->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'timings' => [
                        'fajr',
                        'sunrise',
                        'dhuhr',
                        'asr',
                        'maghrib',
                        'isha',
                    ],
                    'nextPrayer' => [
                        'name',
                        'time',
                        'countdown',
                    ],
                    'qiblaBearing',
                ],
            ]);

        $qibla = $res->json('data.qiblaBearing');
        // Zamboanga City bearing to Kaaba is ~289.4 degrees
        $this->assertGreaterThanOrEqual(285.0, $qibla);
        $this->assertLessThanOrEqual(295.0, $qibla);
    }

    public function test_msme_vendor_registration_and_web_admin_approval_lifecycle(): void
    {
        // 1. Mobile vendor submits self-declaration
        $registrationPayload = [
            'business_name' => 'Al-Huda Satti House (San Jose)',
            'owner_name' => 'Mariam Al-Huda',
            'contact_phone' => '+63 917 999 8888',
            'email' => 'alhuda.satti@gmail.com',
            'region' => 'Region IX',
            'province' => 'Zamboanga City',
            'city_municipality' => 'Zamboanga City',
            'address' => 'San Jose Road, Zamboanga City',
            'latitude' => 6.9200,
            'longitude' => 122.0650,
            'category' => 'dining',
            'target_tier' => 'tier2',
            'cuisine_specialty' => 'Authentic Morning Satti & Grilled Chicken Skewers',
            'meat_supplier_name' => 'NMIS Certified Local Halal Abattoir',
            'strictly_no_pork_alcohol' => true,
            'has_prayer_corner' => true,
            'kitchen_practices_description' => '100% Halal butchered meats, segregated kitchen utensils, dedicated clean prayer corner for guests.',
        ];

        $regRes = $this->postJson('/api/v1/msme/register', $registrationPayload);
        $regRes->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $appData = $regRes->json('data');
        $appId = $appData['id'];
        $this->assertEquals('pending', $appData['status']);

        // 2. Web Admin queries applications
        $listRes = $this->getJson('/api/v1/msme/applications');
        $listRes->assertStatus(200);
        $this->assertTrue(collect($listRes->json('data'))->contains('id', $appId));

        // 3. Web Admin approves the application (which auto-spawns a POI)
        $approveRes = $this->patchJson("/api/v1/msme/applications/{$appId}/status", [
            'status' => 'approved',
            'admin_notes' => 'Verified on-site by Zamboanga City Halal Taskforce.',
        ]);

        $approveRes->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $updatedApp = MsmeApplication::find($appId);
        $this->assertEquals('approved', $updatedApp->status);
        $this->assertNotNull($updatedApp->created_poi_id);

        // 4. Verify created POI exists in Mobile POI discovery
        $poiRes = $this->getJson("/api/v1/pois/{$updatedApp->created_poi_id}");
        $poiRes->assertStatus(200);
        $this->assertEquals('Al-Huda Satti House (San Jose)', $poiRes->json('data.name'));
    }
}
