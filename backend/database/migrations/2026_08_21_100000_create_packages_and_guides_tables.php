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
        // 1. Tour Packages (Package A, B, C)
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->string('package_code')->unique(); // e.g. package_a
            $table->string('code_label');            // e.g. PACKAGE A
            $table->string('title');                 // e.g. All-Inclusive Guided Heritage Expedition
            $table->string('tagline')->nullable();
            $table->string('badge')->nullable();
            $table->string('badge_color')->default('#0B6E4F');
            $table->string('badge_bg')->default('#E8F5EE');
            $table->decimal('price_php', 10, 2)->default(0.00);
            $table->string('price_unit')->default('/ person');
            $table->string('duration')->default('3 Days / 2 Nights');
            $table->json('inclusions')->nullable();
            $table->text('ideal_for')->nullable();
            $table->string('comparison_guide')->nullable();
            $table->string('comparison_tickets')->nullable();
            $table->string('comparison_meals')->nullable();
            $table->string('comparison_offline')->nullable();
            $table->integer('sort_order')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Accredited Tour Guides (DOT / NCMF bilingual guides)
        Schema::create('tour_guides', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('accreditation_number')->unique();
            $table->json('languages')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('email')->nullable();
            $table->decimal('rating', 3, 2)->default(4.90);
            $table->integer('trips_completed')->default(0);
            $table->string('specialties')->nullable();
            $table->string('status')->default('available'); // available, on_tour, inactive
            $table->string('avatar_url')->nullable();
            $table->timestamps();
        });

        // 3. Package Booking Inquiries & Reservations
        Schema::create('package_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_reference')->unique();
            $table->foreignId('tour_package_id')->constrained('tour_packages')->onDelete('cascade');
            $table->foreignId('assigned_guide_id')->nullable()->constrained('tour_guides')->onDelete('set null');
            $table->string('user_name');
            $table->string('user_email');
            $table->string('user_phone');
            $table->string('user_nationality')->default('Philippines / ASEAN');
            $table->string('user_role')->default('halal_tourist'); // foreign_tourist, halal_tourist, local_traveler
            $table->integer('pax_count')->default(1);
            $table->date('travel_date')->nullable();
            $table->string('currency_preference')->default('PHP');
            $table->decimal('estimated_total', 10, 2)->default(0.00);
            $table->string('guide_language_preference')->default('English');
            $table->text('special_requests')->nullable();
            $table->string('status')->default('pending'); // pending, confirmed, completed, cancelled
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_bookings');
        Schema::dropIfExists('tour_guides');
        Schema::dropIfExists('tour_packages');
    }
};
