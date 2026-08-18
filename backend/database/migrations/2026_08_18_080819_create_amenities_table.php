<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('amenities', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('label');
            $table->string('icon')->default('checkmark-circle');
            $table->timestamps();
        });

        Schema::create('poi_amenity', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')->cascadeOnDelete();
            $table->foreignId('amenity_id')->constrained('amenities')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['poi_id', 'amenity_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poi_amenity');
        Schema::dropIfExists('amenities');
    }
};
