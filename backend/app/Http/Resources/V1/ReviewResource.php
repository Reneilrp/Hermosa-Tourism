<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'author' => $this->author_name,
            'rating' => (int) $this->rating,
            'date' => $this->created_at ? $this->created_at->diffForHumans() : 'Recently',
            'comment' => $this->comment,
            'verifiedVisit' => (bool) $this->verified_visit,
            'verifiedWudu' => (bool) $this->verified_wudu,
            'verifiedFemaleArea' => (bool) $this->verified_female_area,
            'dishTags' => $this->dish_tags ?? [],
        ];
    }
}
