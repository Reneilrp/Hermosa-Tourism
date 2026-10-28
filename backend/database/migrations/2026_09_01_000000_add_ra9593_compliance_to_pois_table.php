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
            $table->string('mayors_permit_number')->nullable()->after('accreditation_number');
            $table->string('dti_sec_registration')->nullable()->after('mayors_permit_number');
            $table->boolean('ra9593_compliant')->default(false)->after('dti_sec_registration');
            $table->string('promotion_tier')->default('organic')->after('is_promoted'); // 'organic', 'featured', 'sponsored'
            $table->date('promotion_expires_at')->nullable()->after('promotion_tier');
            $table->text('sponsorship_notes')->nullable()->after('promotion_expires_at');

            $table->index('ra9593_compliant');
            $table->index('promotion_tier');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pois', function (Blueprint $table) {
            $table->dropIndex(['ra9593_compliant']);
            $table->dropIndex(['promotion_tier']);
            $table->dropColumn([
                'mayors_permit_number',
                'dti_sec_registration',
                'ra9593_compliant',
                'promotion_tier',
                'promotion_expires_at',
                'sponsorship_notes',
            ]);
        });
    }
};
