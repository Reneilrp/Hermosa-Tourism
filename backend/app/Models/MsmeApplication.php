<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MsmeApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_number',
        'business_name',
        'owner_name',
        'contact_phone',
        'email',
        'region',
        'province',
        'city_municipality',
        'address',
        'latitude',
        'longitude',
        'category',
        'target_tier',
        'cuisine_specialty',
        'meat_supplier_name',
        'strictly_no_pork_alcohol',
        'has_prayer_corner',
        'kitchen_practices_description',
        'photo_attachments',
        'status',
        'admin_notes',
        'created_poi_id',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'strictly_no_pork_alcohol' => 'boolean',
        'has_prayer_corner' => 'boolean',
        'photo_attachments' => 'array',
    ];

    public function createdPoi(): BelongsTo
    {
        return $this->belongsTo(Poi::class, 'created_poi_id');
    }
}
