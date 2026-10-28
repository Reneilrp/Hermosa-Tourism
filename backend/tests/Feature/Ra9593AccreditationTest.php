<?php

namespace Tests\Feature;

use App\Models\Poi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Ra9593AccreditationTest extends TestCase
{
    use RefreshDatabase;

    public function test_cannot_promote_poi_without_accreditation_or_mayors_permit(): void
    {
        $unaccreditedPoi = Poi::create([
            'custom_id' => 'poi-test-unaccredited',
            'name' => 'Unaccredited Street Eatery',
            'slug' => 'unaccredited-street-eatery',
            'category' => 'dining',
            'tier' => 'tier3',
            'latitude' => 6.9120,
            'longitude' => 122.0650,
            'address' => 'Baliwasan, Zamboanga City',
            'accreditation_number' => null,
            'mayors_permit_number' => null,
            'ra9593_compliant' => false,
            'is_promoted' => false,
            'promotion_tier' => 'organic',
            'is_verified' => true,
            'is_active' => true,
        ]);

        $response = $this->putJson("/api/v1/pois/{$unaccreditedPoi->id}/promotion", [
            'is_promoted' => true,
            'promotion_tier' => 'featured',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'error' => 'RA_9593_COMPLIANCE_ERROR',
            ]);

        $this->assertDatabaseHas('pois', [
            'id' => $unaccreditedPoi->id,
            'is_promoted' => false,
            'promotion_tier' => 'organic',
        ]);
    }

    public function test_can_promote_poi_with_valid_dot_accreditation(): void
    {
        $accreditedPoi = Poi::create([
            'custom_id' => 'poi-test-accredited',
            'name' => 'Accredited Halal Bistro',
            'slug' => 'accredited-halal-bistro',
            'category' => 'dining',
            'tier' => 'tier1',
            'latitude' => 6.9130,
            'longitude' => 122.0660,
            'address' => 'Pilar St, Zamboanga City',
            'accreditation_number' => 'DOT-RO9-ACC-2026-999',
            'mayors_permit_number' => 'MP-ZC-2026-9999',
            'ra9593_compliant' => true,
            'is_promoted' => false,
            'promotion_tier' => 'organic',
            'is_verified' => true,
            'is_active' => true,
        ]);

        $response = $this->putJson("/api/v1/pois/{$accreditedPoi->id}/promotion", [
            'is_promoted' => true,
            'promotion_tier' => 'featured',
            'sponsorship_notes' => 'Official DOT Accredited Tourism Partner',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'isPromoted' => true,
                    'promotionTier' => 'featured',
                    'ra9593Compliant' => true,
                ],
            ]);

        $this->assertDatabaseHas('pois', [
            'id' => $accreditedPoi->id,
            'is_promoted' => true,
            'promotion_tier' => 'featured',
            'ra9593_compliant' => true,
        ]);
    }
}
