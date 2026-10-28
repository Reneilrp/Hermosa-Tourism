<?php

use App\Http\Controllers\Api\V1\MsmeController;
use App\Http\Controllers\Api\V1\PackageController;
use App\Http\Controllers\Api\V1\PoiController;
use App\Http\Controllers\Api\V1\PrayerController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\SyncController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Version 1 API Routes
Route::prefix('v1')->group(function () {
    // Health check
    Route::get('/health', function () {
        return response()->json([
            'status' => 'healthy',
            'app' => 'Hermosa-Tourism API',
            'regional_app' => 'Hermosa-Tourism Regional & Maritime API',
            'city' => 'Zamboanga City, Philippines',
            'version' => '2.0.0',
            'regions' => ['Region IX (Zamboanga Peninsula)', 'BARMM (ZAMBASULTA)'],
            'timestamp' => now()->toISOString(),
        ]);
    });

    // Low-Bandwidth Offline Sync Bundle
    Route::get('/sync/bundle', [SyncController::class, 'bundle']);

    // POIs & Halal Places
    Route::get('/pois', [PoiController::class, 'index']);
    Route::get('/pois/{id}', [PoiController::class, 'show']);
    Route::put('/pois/{id}/promotion', [PoiController::class, 'updatePromotion']);

    // Place Reviews
    Route::post('/pois/{id}/reviews', [ReviewController::class, 'store']);

    // Qibla & Prayer Services
    Route::get('/prayers/today', [PrayerController::class, 'today']);

    // MSME Vendor Self-Declaration & Onboarding
    Route::get('/msme/applications', [MsmeController::class, 'index']);
    Route::post('/msme/register', [MsmeController::class, 'register']);
    Route::patch('/msme/applications/{id}/status', [MsmeController::class, 'updateStatus']);

    // Tour Packages, Guides & Inquiries
    Route::get('/packages', [PackageController::class, 'index']);
    Route::get('/packages/{id}', [PackageController::class, 'show']);
    Route::put('/packages/{id}', [PackageController::class, 'update']);
    Route::post('/packages/inquire', [PackageController::class, 'inquire']);
    Route::get('/packages/bookings/all', [PackageController::class, 'bookings']);
    Route::patch('/packages/bookings/{id}/status', [PackageController::class, 'updateBookingStatus']);
    Route::post('/packages/bookings/{reference}/pay', [PackageController::class, 'processPayment']);
    Route::get('/packages/bookings/{reference}/voucher', [PackageController::class, 'getVoucher']);
    Route::get('/tour-guides', [PackageController::class, 'guides']);
});
