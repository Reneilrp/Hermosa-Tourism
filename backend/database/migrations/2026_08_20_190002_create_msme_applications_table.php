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
        Schema::create('msme_applications', function (Blueprint $table) {
            $table->id();
            $table->string('application_number')->unique();
            $table->string('business_name');
            $table->string('owner_name');
            $table->string('contact_phone');
            $table->string('email')->nullable();
            $table->string('region')->default('Region IX');
            $table->string('province');
            $table->string('city_municipality');
            $table->string('address');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('category')->default('dining'); // dining, market, lodging
            $table->string('target_tier')->default('tier2'); // tier2 (Muslim-Owned) or tier3 (Halal Options)
            $table->string('cuisine_specialty')->nullable();
            $table->string('meat_supplier_name')->nullable();
            $table->boolean('strictly_no_pork_alcohol')->default(true);
            $table->boolean('has_prayer_corner')->default(false);
            $table->text('kitchen_practices_description')->nullable();
            $table->json('photo_attachments')->nullable();
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->text('admin_notes')->nullable();
            $table->foreignId('created_poi_id')->nullable()->constrained('pois')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('msme_applications');
    }
};
