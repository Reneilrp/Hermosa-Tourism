<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PrayerController extends Controller
{
    const KAABA_LAT = 21.422487;

    const KAABA_LNG = 39.826206;

    /**
     * Get synchronized daily prayer timings, next prayer countdown, and Qibla bearing for Zamboanga.
     */
    public function today(Request $request): JsonResponse
    {
        $lat = (float) $request->query('lat', 6.9147); // Default WMSU
        $lng = (float) $request->query('lng', 122.0600);

        // Fixed baseline timings for Zamboanga City (+8 UTC)
        $timings = [
            'fajr' => '04:52',
            'sunrise' => '05:58',
            'dhuhr' => '12:08',
            'asr' => '15:20',
            'maghrib' => '18:14',
            'isha' => '19:24',
        ];

        $now = Carbon::now('Asia/Manila');
        $currentMinutes = $now->hour * 60 + $now->minute;

        $prayers = [
            ['name' => 'Fajr', 'time' => $timings['fajr']],
            ['name' => 'Sunrise', 'time' => $timings['sunrise']],
            ['name' => 'Dhuhr', 'time' => $timings['dhuhr']],
            ['name' => 'Asr', 'time' => $timings['asr']],
            ['name' => 'Maghrib', 'time' => $timings['maghrib']],
            ['name' => 'Isha', 'time' => $timings['isha']],
        ];

        $nextPrayer = null;
        foreach ($prayers as $p) {
            [$h, $m] = explode(':', $p['time']);
            $prayerMinutes = ((int) $h) * 60 + ((int) $m);
            if ($prayerMinutes > $currentMinutes) {
                $diff = $prayerMinutes - $currentMinutes;
                $hours = floor($diff / 60);
                $mins = $diff % 60;
                $nextPrayer = [
                    'name' => $p['name'],
                    'time' => $p['time'],
                    'countdown' => $hours > 0 ? "in {$hours}h {$mins}m" : "in {$mins}m",
                ];
                break;
            }
        }

        if (! $nextPrayer) {
            $nextPrayer = [
                'name' => 'Fajr',
                'time' => $timings['fajr'],
                'countdown' => 'Tomorrow',
            ];
        }

        $qiblaBearing = $this->calculateQiblaBearing($lat, $lng);

        return response()->json([
            'success' => true,
            'data' => [
                'timings' => $timings,
                'nextPrayer' => $nextPrayer,
                'qiblaBearing' => $qiblaBearing,
                'location' => [
                    'city' => 'Zamboanga City',
                    'latitude' => $lat,
                    'longitude' => $lng,
                ],
                'date' => [
                    'readable' => $now->format('M d, Y'),
                    'hijri' => '14 Safar 1448 AH',
                ],
            ],
        ]);
    }

    /**
     * Compute Forward Azimuth (Bearing) from user coordinates to Kaaba in Makkah.
     */
    private function calculateQiblaBearing(float $userLat, float $userLng): float
    {
        $phi1 = deg2rad($userLat);
        $phi2 = deg2rad(self::KAABA_LAT);
        $deltaLambda = deg2rad(self::KAABA_LNG - $userLng);

        $y = sin($deltaLambda);
        $x = cos($phi1) * tan($phi2) - sin($phi1) * cos($deltaLambda);

        $qibla = rad2deg(atan2($y, $x));
        $qibla = ($qibla + 360) % 360;

        return round($qibla, 1);
    }
}
