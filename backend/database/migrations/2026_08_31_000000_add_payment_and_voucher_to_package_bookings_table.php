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
        Schema::table('package_bookings', function (Blueprint $table) {
            $table->string('payment_channel')->default('gcash')->after('currency_preference');
            $table->string('payment_status')->default('unpaid')->after('payment_channel'); // unpaid, pending_verification, paid, refunded
            $table->string('payment_reference')->nullable()->after('payment_status');
            $table->decimal('base_price', 10, 2)->default(0.00)->after('payment_reference');
            $table->decimal('gateway_fee', 10, 2)->default(0.00)->after('base_price');
            $table->decimal('total_amount_paid', 10, 2)->default(0.00)->after('gateway_fee');
            $table->string('proof_of_payment_url')->nullable()->after('total_amount_paid');
            $table->string('voucher_code')->nullable()->after('proof_of_payment_url');
            $table->boolean('auto_confirmed')->default(false)->after('voucher_code');
            $table->timestamp('paid_at')->nullable()->after('auto_confirmed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('package_bookings', function (Blueprint $table) {
            $table->dropColumn([
                'payment_channel',
                'payment_status',
                'payment_reference',
                'base_price',
                'gateway_fee',
                'total_amount_paid',
                'proof_of_payment_url',
                'voucher_code',
                'auto_confirmed',
                'paid_at',
            ]);
        });
    }
};
