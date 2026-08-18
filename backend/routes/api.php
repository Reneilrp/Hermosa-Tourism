<?php

use App\Http\Controllers\Api\V1\PoiController;
use App\Http\Controllers\Api\V1\PrayerController;
use App\Http\Controllers\Api\V1\ReviewController;
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
            'version' => '1.0.0',
            'city' => 'Zamboanga City, Philippines',
            'timestamp' => now()->toISOString(),
        ]);
    });

    // POIs & Halal Places
    Route::get('/pois', [PoiController::class, 'index']);
    Route::get('/pois/{id}', [PoiController::class, 'show']);

    // Place Reviews
    Route::post('/pois/{id}/reviews', [ReviewController::class, 'store']);

    // Qibla & Prayer Services
    Route::get('/prayers/today', [PrayerController::class, 'today']);
});
