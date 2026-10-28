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
        Schema::table('pois', function (Blueprint $table) {
            $table->string('region')->default('Region IX')->after('tier');
            $table->string('province')->default('Zamboanga City')->after('region');
            $table->string('city_municipality')->default('Zamboanga City')->after('province');

            $table->index('region');
            $table->index('province');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pois', function (Blueprint $table) {
            $table->dropIndex(['region']);
            $table->dropIndex(['province']);
            $table->dropColumn(['region', 'province', 'city_municipality']);
        });
    }
};
