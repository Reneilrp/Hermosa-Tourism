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
        $search = $request->query('search', '');
        $radiusKm = $request->query('radius_km');

        $query = Poi::with(['amenities', 'activeCertificate', 'reviews'])
            ->where('is_active', true);

        // Filter by Category
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        // Filter by Halal Verification Tier
        if ($tier && $tier !== 'all') {
            $query->where('tier', $tier);
        }

        // Search query across name, cuisine, address, and description
        if (!empty($search)) {
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

        if (!$poi) {
            return response()->json([
                'success' => false,
                'message' => 'Place not found in Zamboanga database',
            ], 404);
        }

        return new PoiResource($poi);
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
