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
        Schema::table('tour_packages', function (Blueprint $table) {
            $table->boolean('is_prayer_aligned')->default(true)->after('duration');
            $table->json('inclusions_matrix')->nullable()->after('inclusions');
            $table->json('prayer_itinerary')->nullable()->after('inclusions_matrix');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tour_packages', function (Blueprint $table) {
            $table->dropColumn([
                'is_prayer_aligned',
                'inclusions_matrix',
                'prayer_itinerary',
            ]);
        });
    }
};
