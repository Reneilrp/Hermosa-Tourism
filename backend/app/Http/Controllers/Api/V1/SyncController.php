<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\PoiResource;
use App\Models\Poi;
use App\Models\TourGuide;
use App\Models\TourPackage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SyncController extends Controller
{
    /**
     * Return comprehensive lightweight JSON bundle for offline caching in low-bandwidth / zero-signal zones.
     */
    public function bundle(Request $request): JsonResponse
    {
        $pois = Poi::with(['amenities', 'activeCertificate'])
            ->where('is_active', true)
            ->get();

        // Standard regional prayer schedule anchor
        $prayerSchedule = [
            'fajr' => '04:45 AM',
            'sunrise' => '05:58 AM',
            'dhuhr' => '12:02 PM',
            'asr' => '03:18 PM',
            'maghrib' => '06:06 PM',
            'isha' => '07:16 PM',
            'qibla_bearing_degrees' => 291.5,
            'calculation_method' => 'Muslim World League (MWL)',
            'timezone' => 'Asia/Manila (UTC+8)',
        ];

        return response()->json([
            'success' => true,
            'version' => '2026.1.0',
            'synced_at' => now()->toISOString(),
            'regions_covered' => ['Region IX (Zamboanga Peninsula)', 'BARMM (ZAMBASULTA)'],
            'pois' => PoiResource::collection($pois),
            'ports' => [],
            'maritime_routes' => [],
            'routes' => [],
            'packages' => TourPackage::where('is_active', true)->orderBy('sort_order', 'asc')->get(),
            'tour_guides' => TourGuide::all(),
            'prayer_schedule' => $prayerSchedule,
            'prayers' => $prayerSchedule,
            'emergency_contacts' => [
                'philippine_coast_guard_zam' => '+63 917 815 6900',
                'philippine_coast_guard_basilan' => '+63 917 816 7722',
                'philippine_coast_guard_sulu' => '+63 917 818 9911',
                'philippine_coast_guard_tawitawi' => '+63 917 820 3344',
                'dot_region_9_tourism' => '+63 62 993 0030',
                'barmm_tourism_office' => '+63 64 552 0001',
                'zamboanga_city_emergency' => '911 / (062) 991-2999',
            ],
        ]);
    }
}
