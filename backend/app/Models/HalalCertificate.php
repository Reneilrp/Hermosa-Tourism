<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HalalCertificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'poi_id',
        'cert_body',
        'cert_number',
        'status',
        'valid_until',
        'document_url',
    ];

    protected $casts = [
        'valid_until' => 'date',
    ];

    public function poi(): BelongsTo
    {
        return $this->belongsTo(Poi::class);
    }
}
