<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'poi_id',
        'user_id',
        'author_name',
        'rating',
        'comment',
        'verified_visit',
        'verified_wudu',
        'verified_female_area',
        'dish_tags',
    ];

    protected $casts = [
        'rating' => 'integer',
        'verified_visit' => 'boolean',
        'verified_wudu' => 'boolean',
        'verified_female_area' => 'boolean',
        'dish_tags' => 'array',
    ];

    public function poi(): BelongsTo
    {
        return $this->belongsTo(Poi::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
