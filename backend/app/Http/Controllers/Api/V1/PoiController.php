<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PoiResource;
use App\Models\Poi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PoiController extends Controller
{
    /**
     * Display a listing of POIs with geospatial distance calculation and filters.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        // User origin coordinates (default to WMSU Main Campus, Baliwasan, Zamboanga City)
        $userLat = (float) $request->query('lat', 6.9147);
        $userLng = (float) $request->query('lng', 122.0600);
        $category = $request->query('category', 'all');
        $tier = $request->query('tier', 'all');
        $province = $request->query('province', 'all');
        $region = $request->query('region', 'all');
        $search = $request->query('search', '');
        $radiusKm = $request->query('radius_km');

        $query = Poi::with(['amenities', 'activeCertificate', 'reviews'])
            ->where('is_active', true);

        // Filter by Region
        if ($region && $region !== 'all') {
            $query->where('region', $region);
        }

        // Filter by Province
        if ($province && $province !== 'all') {
            $query->where('province', $province);
        }

        // Filter by Category
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        // Filter by Halal Verification Tier
        if ($tier && $tier !== 'all') {
            $query->where('tier', $tier);
        }

        // Search query across name, cuisine, address, and description
        if (! empty($search)) {
            $query->where(function ($q) use ($search) {
                $term = "%{$search}%";
                $q->where('name', 'like', $term)
                    ->orWhere('cuisine', 'like', $term)
                    ->orWhere('address', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        $pois = $query->get();

        // Calculate Haversine distance in PHP for maximum database compatibility (SQLite/MySQL/PostgreSQL)
        $poisWithDistance = $pois->map(function ($poi) use ($userLat, $userLng) {
            $poi->distance_km = $this->haversineGreatCircleDistance(
                $userLat,
                $userLng,
                $poi->latitude,
                $poi->longitude
            );

            return $poi;
        });

        // Filter by optional radius
        if ($radiusKm && is_numeric($radiusKm)) {
            $poisWithDistance = $poisWithDistance->filter(function ($poi) use ($radiusKm) {
                return $poi->distance_km <= (float) $radiusKm;
            });
        }

        // Sort ascending by closest distance from user
        $sorted = $poisWithDistance->sortBy('distance_km')->values();

        return PoiResource::collection($sorted);
    }

    /**
     * Display the specified POI with all relationships.
     */
    public function show(string $id): JsonResponse|PoiResource
    {
        $poi = Poi::with(['amenities', 'certificates', 'reviews'])
            ->where('custom_id', $id)
            ->orWhere('id', $id)
            ->first();

        if (! $poi) {
            return response()->json([
                'success' => false,
                'message' => 'Place not found in Zamboanga database',
            ], 404);
        }

        return new PoiResource($poi);
    }

    /**
     * Update POI promotion status with RA 9593 statutory accreditation enforcement.
     */
    public function updatePromotion(Request $request, string $id): JsonResponse
    {
        $poi = Poi::where('custom_id', $id)->orWhere('id', $id)->first();

        if (! $poi) {
            return response()->json([
                'success' => false,
                'message' => 'Place not found in Zamboanga database',
            ], 404);
        }

        $validated = $request->validate([
            'is_promoted' => 'required|boolean',
            'promotion_tier' => 'nullable|string|in:organic,featured,sponsored',
            'accreditation_number' => 'nullable|string|max:100',
            'mayors_permit_number' => 'nullable|string|max:100',
            'dti_sec_registration' => 'nullable|string|max:100',
            'promotion_expires_at' => 'nullable|date',
            'sponsorship_notes' => 'nullable|string|max:1000',
        ]);

        $wantsPromotion = (bool) $validated['is_promoted'] || ($validated['promotion_tier'] ?? 'organic') !== 'organic';
        
        $effectiveAccreditation = $validated['accreditation_number'] ?? $poi->accreditation_number;
        $effectiveMayorsPermit = $validated['mayors_permit_number'] ?? $poi->mayors_permit_number;

        // RA 9593 Statutory Gate Check
        if ($wantsPromotion && empty($effectiveAccreditation) && empty($effectiveMayorsPermit)) {
            return response()->json([
                'success' => false,
                'error' => 'RA_9593_COMPLIANCE_ERROR',
                'message' => 'Statutory Compliance Violation (RA 9593): Under Republic Act No. 9593 (The Tourism Act of 2009), primary and secondary tourism establishments cannot receive official marketing promotion or featured placement without a valid Department of Tourism (DOT) Accreditation or LGU Mayor\'s Business Permit.',
                'requirements' => [
                    'dot_accreditation_required' => true,
                    'mayors_permit_required' => true,
                    'legal_basis' => 'Republic Act No. 9593 Section 39 & DOT Memorandum Circular No. 2020-002',
                ],
            ], 422);
        }

        if (isset($validated['accreditation_number'])) {
            $poi->accreditation_number = $validated['accreditation_number'];
        }
        if (isset($validated['mayors_permit_number'])) {
            $poi->mayors_permit_number = $validated['mayors_permit_number'];
        }
        if (isset($validated['dti_sec_registration'])) {
            $poi->dti_sec_registration = $validated['dti_sec_registration'];
        }
        if (isset($validated['promotion_expires_at'])) {
            $poi->promotion_expires_at = $validated['promotion_expires_at'];
        }
        if (isset($validated['sponsorship_notes'])) {
            $poi->sponsorship_notes = $validated['sponsorship_notes'];
        }

        $poi->is_promoted = (bool) $validated['is_promoted'];
        $poi->promotion_tier = $validated['is_promoted'] 
            ? ($validated['promotion_tier'] ?? 'featured') 
            : 'organic';
        $poi->ra9593_compliant = ! empty($poi->accreditation_number) || ! empty($poi->mayors_permit_number);
        $poi->save();

        return response()->json([
            'success' => true,
            'message' => $poi->is_promoted 
                ? "Establishment successfully promoted under RA 9593 accreditation verified tier ({$poi->promotion_tier})."
                : 'Promotion deactivated. Establishment returned to organic directory ranking.',
            'data' => new PoiResource($poi),
        ]);
    }

    /**
     * Calculate distance between two coordinates in kilometers using Haversine formula.
     */
    private function haversineGreatCircleDistance(float $lat1, float $lon1, float $lat2, float $lon2): float
    {
        $earthRadius = 6371; // km
        $latFrom = deg2rad($lat1);
        $lonFrom = deg2rad($lon1);
        $latTo = deg2rad($lat2);
        $lonTo = deg2rad($lon2);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
            cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));

        return $angle * $earthRadius;
    }
}
