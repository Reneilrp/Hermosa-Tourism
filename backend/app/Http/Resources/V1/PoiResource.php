<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PoiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->custom_id ?? (string) $this->id,
            'db_id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => $this->category,
            'tier' => $this->tier,
            'certBody' => $this->activeCertificate?->cert_body ?? 'Zamboanga Islamic Council',
            'certNumber' => $this->activeCertificate?->cert_number ?? 'VERIFIED',
            'rating' => (float) $this->rating,
            'reviewCount' => (int) $this->review_count,
            'priceRange' => $this->price_range,
            'cuisine' => $this->cuisine,
            'address' => $this->address,
            'latitude' => (float) $this->latitude,
            'longitude' => (float) $this->longitude,
            'hours' => $this->operating_hours,
            'phone' => $this->phone,
            'image' => $this->image_url,
            'description' => $this->description,
            'popularDishes' => $this->popular_items ?? [],
            'distanceKm' => isset($this->distance_km) ? round((float) $this->distance_km, 1) : null,
            'amenities' => AmenityResource::collection($this->whenLoaded('amenities')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
