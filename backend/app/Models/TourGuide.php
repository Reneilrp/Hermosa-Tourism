<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TourGuide extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'accreditation_number',
        'languages',
        'contact_phone',
        'email',
        'rating',
        'trips_completed',
        'specialties',
        'status',
        'avatar_url',
    ];

    protected $casts = [
        'languages' => 'array',
        'rating' => 'decimal:2',
        'trips_completed' => 'integer',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(PackageBooking::class, 'assigned_guide_id');
    }
}
