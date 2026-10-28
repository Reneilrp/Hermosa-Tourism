<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_code',
        'code_label',
        'title',
        'tagline',
        'badge',
        'badge_color',
        'badge_bg',
        'price_php',
        'price_unit',
        'duration',
        'is_prayer_aligned',
        'inclusions',
        'inclusions_matrix',
        'prayer_itinerary',
        'ideal_for',
        'comparison_guide',
        'comparison_tickets',
        'comparison_meals',
        'comparison_offline',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'inclusions' => 'array',
        'inclusions_matrix' => 'array',
        'prayer_itinerary' => 'array',
        'is_prayer_aligned' => 'boolean',
        'price_php' => 'decimal:2',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(PackageBooking::class);
    }
}
