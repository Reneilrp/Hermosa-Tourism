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
            'isMuslimFriendly' => (bool) ($this->is_muslim_friendly ?? false),
            'hasSeparateCooking' => (bool) ($this->has_separate_cooking ?? false),
            'hasPrayerRoom' => (bool) ($this->has_prayer_room ?? false),
            'supplierName' => $this->supplier_name,
            'supplierLocation' => $this->supplier_location,
            'accreditationNumber' => $this->accreditation_number,
            'mayorsPermitNumber' => $this->mayors_permit_number,
            'dtiSecRegistration' => $this->dti_sec_registration,
            'ra9593Compliant' => (bool) ($this->ra9593_compliant || ! empty($this->accreditation_number)),
            'isPromoted' => (bool) ($this->is_promoted ?? false),
            'promotionTier' => $this->promotion_tier ?? 'organic',
            'promotionExpiresAt' => $this->promotion_expires_at,
            'canBePromoted' => $this->canBePromoted(),
            'region' => $this->region ?? 'Region IX',
            'province' => $this->province ?? 'Zamboanga City',
            'cityMunicipality' => $this->city_municipality ?? 'Zamboanga City',
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
