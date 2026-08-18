<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Amenity extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'label',
        'icon',
    ];

    public function pois(): BelongsToMany
    {
        return $this->belongsToMany(Poi::class, 'poi_amenity');
    }
}
