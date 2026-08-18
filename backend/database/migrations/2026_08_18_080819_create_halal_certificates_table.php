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
        Schema::create('halal_certificates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poi_id')->constrained('pois')->cascadeOnDelete();
            $table->string('cert_body');
            $table->string('cert_number');
            $table->string('status')->default('approved'); // 'approved', 'under_review', 'expired'
            $table->date('valid_until')->nullable();
            $table->string('document_url')->nullable();
            $table->timestamps();

            $table->index('poi_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('halal_certificates');
    }
};
