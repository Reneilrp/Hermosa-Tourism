<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PackageBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_reference',
        'tour_package_id',
        'assigned_guide_id',
        'user_name',
        'user_email',
        'user_phone',
        'user_nationality',
        'user_role',
        'pax_count',
        'tourist_roster',
        'travel_date',
        'currency_preference',
        'payment_channel',
        'payment_status',
        'payment_reference',
        'base_price',
        'gateway_fee',
        'total_amount_paid',
        'proof_of_payment_url',
        'voucher_code',
        'auto_confirmed',
        'paid_at',
        'estimated_total',
        'guide_language_preference',
        'special_requests',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'pax_count' => 'integer',
        'tourist_roster' => 'array',
        'base_price' => 'decimal:2',
        'gateway_fee' => 'decimal:2',
        'total_amount_paid' => 'decimal:2',
        'estimated_total' => 'decimal:2',
        'auto_confirmed' => 'boolean',
        'paid_at' => 'datetime',
        'travel_date' => 'date',
    ];

    public function package(): BelongsTo
    {
        return $this->belongsTo(TourPackage::class, 'tour_package_id');
    }

    public function assignedGuide(): BelongsTo
    {
        return $this->belongsTo(TourGuide::class, 'assigned_guide_id');
    }
}
