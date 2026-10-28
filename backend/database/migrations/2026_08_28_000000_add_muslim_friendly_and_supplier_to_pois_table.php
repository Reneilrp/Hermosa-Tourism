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
            $table->boolean('is_muslim_friendly')->default(false)->after('tier');
            $table->boolean('has_separate_cooking')->default(false)->after('is_muslim_friendly');
            $table->boolean('has_prayer_room')->default(false)->after('has_separate_cooking');
            $table->string('supplier_name')->nullable()->after('has_prayer_room');
            $table->string('supplier_location')->nullable()->after('supplier_name');
            $table->string('accreditation_number')->nullable()->after('supplier_location');
            $table->boolean('is_promoted')->default(false)->after('accreditation_number');

            $table->index('is_muslim_friendly');
            $table->index('is_promoted');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pois', function (Blueprint $table) {
            $table->dropIndex(['is_muslim_friendly']);
            $table->dropIndex(['is_promoted']);
            $table->dropColumn([
                'is_muslim_friendly',
                'has_separate_cooking',
                'has_prayer_room',
                'supplier_name',
                'supplier_location',
                'accreditation_number',
                'is_promoted',
            ]);
        });
    }
};
