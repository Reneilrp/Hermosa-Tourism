<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ReviewResource;
use App\Models\Poi;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Submit a new review and update average rating.
     */
    public function store(Request $request, string $poiId): JsonResponse
    {
        $poi = Poi::where('custom_id', $poiId)->orWhere('id', $poiId)->first();

        if (! $poi) {
            return response()->json([
                'success' => false,
                'message' => 'Place not found',
            ], 404);
        }

        $validated = $request->validate([
            'author_name' => 'required|string|max:100',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|max:1000',
            'verified_visit' => 'nullable|boolean',
            'verified_wudu' => 'nullable|boolean',
            'verified_female_area' => 'nullable|boolean',
            'dish_tags' => 'nullable|array',
        ]);

        $review = Review::create([
            'poi_id' => $poi->id,
            'user_id' => $request->user()?->id,
            'author_name' => $validated['author_name'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'verified_visit' => $validated['verified_visit'] ?? true,
            'verified_wudu' => $validated['verified_wudu'] ?? true,
            'verified_female_area' => $validated['verified_female_area'] ?? true,
            'dish_tags' => $validated['dish_tags'] ?? [],
        ]);

        // Recalculate average rating & review count
        $avgRating = Review::where('poi_id', $poi->id)->avg('rating');
        $reviewCount = Review::where('poi_id', $poi->id)->count();

        $poi->update([
            'rating' => round($avgRating, 2),
            'review_count' => $reviewCount,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review submitted successfully',
            'data' => new ReviewResource($review),
        ], 201);
    }
}
