<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Poi extends Model
{
    use HasFactory;

    protected $fillable = [
        'custom_id',
        'name',
        'slug',
        'category',
        'tier',
        'is_muslim_friendly',
        'has_separate_cooking',
        'has_prayer_room',
        'supplier_name',
        'supplier_location',
        'accreditation_number',
        'mayors_permit_number',
        'dti_sec_registration',
        'ra9593_compliant',
        'is_promoted',
        'promotion_tier',
        'promotion_expires_at',
        'sponsorship_notes',
        'region',
        'province',
        'city_municipality',
        'latitude',
        'longitude',
        'address',
        'phone',
        'cuisine',
        'price_range',
        'operating_hours',
        'image_url',
        'description',
        'popular_items',
        'rating',
        'review_count',
        'is_verified',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'rating' => 'float',
        'review_count' => 'integer',
        'popular_items' => 'array',
        'is_muslim_friendly' => 'boolean',
        'has_separate_cooking' => 'boolean',
        'has_prayer_room' => 'boolean',
        'is_promoted' => 'boolean',
        'ra9593_compliant' => 'boolean',
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Determine if establishment complies with RA 9593 for official promotion.
     */
    public function canBePromoted(): bool
    {
        return ! empty($this->accreditation_number) || (bool) $this->ra9593_compliant;
    }

    public function amenities(): BelongsToMany
    {
        return $this->belongsToMany(Amenity::class, 'poi_amenity');
    }

    public function certificates(): HasMany
    {
        return $this->hasMany(HalalCertificate::class);
    }

    public function activeCertificate(): HasOne
    {
        return $this->hasOne(HalalCertificate::class)->latestOfMany();
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->latest();
    }
}
