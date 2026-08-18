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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('author_name');
            $table->unsignedTinyInteger('rating')->default(5);
            $table->text('comment');
            $table->boolean('verified_visit')->default(true);
            $table->boolean('verified_wudu')->default(true);
            $table->boolean('verified_female_area')->default(true);
            $table->json('dish_tags')->nullable();
            $table->timestamps();

            $table->index('poi_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
