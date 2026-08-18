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
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

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
