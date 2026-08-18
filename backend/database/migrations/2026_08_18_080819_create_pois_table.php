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
        Schema::create('pois', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique()->nullable();
            $table->string('name');
            $table->string('slug')->nullable();
            $table->string('category'); // 'worship', 'dining', 'market', 'cultural'
            $table->string('tier'); // 'tier1', 'tier2', 'tier3', 'tier4'
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('address');
            $table->string('phone')->nullable();
            $table->string('cuisine')->nullable();
            $table->string('price_range')->default('$');
            $table->string('operating_hours')->nullable();
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->json('popular_items')->nullable();
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->unsignedInteger('review_count')->default(0);
            $table->boolean('is_verified')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['latitude', 'longitude']);
            $table->index('category');
            $table->index('tier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pois');
    }
};
