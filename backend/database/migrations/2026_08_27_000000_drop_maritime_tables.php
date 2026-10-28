<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations to drop decommissioned maritime tables.
     */
    public function up(): void
    {
        Schema::dropIfExists('maritime_routes');
        Schema::dropIfExists('port_terminals');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('port_terminals', function (Blueprint $table) {
            $table->id();
            $table->string('custom_id')->unique()->nullable();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('region');
            $table->string('province');
            $table->string('city_municipality');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->string('address');
            $table->string('contact_number')->nullable();
            $table->string('coast_guard_hotline')->nullable();
            $table->boolean('has_prayer_room')->default(true);
            $table->boolean('has_wudu_area')->default(true);
            $table->boolean('has_halal_food_nearby')->default(true);
            $table->text('guidelines')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
        });

        Schema::create('maritime_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('origin_port_id')->constrained('port_terminals')->onDelete('cascade');
            $table->foreignId('destination_port_id')->constrained('port_terminals')->onDelete('cascade');
            $table->string('operator_name');
            $table->string('vessel_type');
            $table->string('estimated_duration');
            $table->decimal('estimated_fare_economy', 8, 2)->default(0.00);
            $table->decimal('estimated_fare_business', 8, 2)->nullable();
            $table->json('departure_schedules');
            $table->boolean('has_onboard_prayer_area')->default(false);
            $table->boolean('has_halal_food_onboard')->default(false);
            $table->string('booking_phone')->nullable();
            $table->text('travel_advisory')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
};
