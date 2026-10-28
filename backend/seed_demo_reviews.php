<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Poi;
use App\Models\Review;

$demoReviews = [
    'poi-sadik-grand-mosque' => [
        [
            'author_name' => 'Fatima Nur-Zahra',
            'rating' => 5,
            'comment' => 'Beautiful female prayer hall with private wudu stations and elevators for elderly. A must-visit place of worship in Mercedes!',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Spacious Musalla', 'Clean Wudu', 'Elevator Access'],
            'created_at' => now()->subHours(5),
        ],
        [
            'author_name' => 'Ahmad Zulkifli (Tourist from KL)',
            'rating' => 5,
            'comment' => 'Visited from Kuala Lumpur with family. Peaceful and magnificent minarets. Excellent parking and clean ablution area.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['BIMP-EAGA Traveler', 'Friday Jumuah'],
            'created_at' => now()->subDays(2),
        ],
    ],
    'poi-baliwasan-mosque' => [
        [
            'author_name' => 'Prof. Nur-Aina Jamasali',
            'rating' => 5,
            'comment' => 'Walking distance from WMSU College of Law. Dedicated women\'s section is air-cooled and pristine. Water pressure is always strong.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Near WMSU', 'Clean Musalla', 'Strong Water'],
            'created_at' => now()->subHours(8),
        ],
        [
            'author_name' => 'Amirul Mansur (Student)',
            'rating' => 5,
            'comment' => 'Super accessible for students and campus visitors. Imams give very inspiring and educational reminders between prayers.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Youth Study Circle', 'Daily Congregation'],
            'created_at' => now()->subDays(3),
        ],
    ],
    'poi-taluksangay' => [
        [
            'author_name' => 'Ustadh Ibrahim Al-Hashimi',
            'rating' => 5,
            'comment' => 'Rich history and peaceful atmosphere. The oldest cradle of Islam in Zamboanga peninsula (Est. 1885). The minarets reflecting on the estuary are breathtaking.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Historical Landmark', 'Taluksangay Estuary'],
            'created_at' => now()->subDays(1),
        ],
        [
            'author_name' => 'Sheila Mae Tan (DOT Tourist)',
            'rating' => 5,
            'comment' => 'Our DOT accredited guide brought us here during the Heritage tour. Very welcoming elders, historic artifacts, and well-maintained grounds.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Heritage Tour', 'RA 9593 Guide'],
            'created_at' => now()->subDays(4),
        ],
    ],
    'poi-bay-tal-mal' => [
        [
            'author_name' => 'Engr. Tariq Abubakar',
            'rating' => 5,
            'comment' => '100% NCMF verified halal beef. The Beef Kulma and Piyanggang chicken are rich with coconut milk and roasted spices. Clean prayer room upstairs.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Beef Kulma', 'Piyanggang Chicken', 'Musalla Upstairs'],
            'created_at' => now()->subHours(12),
        ],
        [
            'author_name' => 'Siti Rahmah (Brunei Tourist)',
            'rating' => 5,
            'comment' => 'Authentic Moro culinary experience in Zamboanga! Staff are polite, food is served hot, and the prayer room has dedicated wudu taps.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Halal Certified', 'Family Dining'],
            'created_at' => now()->subDays(3),
        ],
    ],
    'poi-jimmys-satti' => [
        [
            'author_name' => 'Capt. Jun Alih',
            'rating' => 5,
            'comment' => 'No morning in Zamboanga is complete without Ymmij Satti! The spicy red broth over hot diamond ta\'mu rice cakes is an absolute staple.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Morning Satti', 'Extra Spicy Broth', 'Ta\'mu Rice'],
            'created_at' => now()->subHours(2),
        ],
        [
            'author_name' => 'Melissa Rivera (Cebu Traveler)',
            'rating' => 5,
            'comment' => 'First time trying Zamboanga satti. Perfectly charcoal-grilled skewers and the sweet-spicy peanut sauce is addictive! Very affordable.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Charcoal Grilled', 'Must Try'],
            'created_at' => now()->subDays(1),
        ],
        [
            'author_name' => 'Rashdi Samad',
            'rating' => 5,
            'comment' => 'Halal beef and chicken sourced fresh every dawn. Great breakfast stop before taking the boat to Great Santa Cruz Island!',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Fresh Halal Meat', 'Breakfast Landmark'],
            'created_at' => now()->subDays(5),
        ],
    ],
    'poi-dennis-coffee' => [
        [
            'author_name' => 'Fatima Zahra (Food & Culture Blogger)',
            'rating' => 5,
            'comment' => 'Kahawa Sug paired with traditional Juvang and Bangbang Sug pastries. The ambiance is vibrant, colorful, and celebrate local Moro arts.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Kahawa Sug Coffee', 'Traditional Pastries', 'Yakan Decors'],
            'created_at' => now()->subHours(16),
        ],
        [
            'author_name' => 'Architect Carlo Mendoza',
            'rating' => 5,
            'comment' => 'Stunning interior reflecting Yakan weaving and local timbercraft. Dedicated clean musalla available for customers for prayer.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Dedicated Musalla', 'Artisan Coffee'],
            'created_at' => now()->subDays(2),
        ],
    ],
    'poi-al-sultan' => [
        [
            'author_name' => 'Mariam Pendatun',
            'rating' => 5,
            'comment' => 'Their Beef Rendang and freshly baked roti canai are perfection. Certified halal kitchen with transparent supplier tracing.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Beef Rendang', 'Roti Canai', 'Certified Halal'],
            'created_at' => now()->subDays(1),
        ],
        [
            'author_name' => 'Ziyad Al-Ghamdi',
            'rating' => 5,
            'comment' => 'Excellent Arabic and Moro fusion. Family-friendly private dining booths and clean prayer amenities on the second floor.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Family Friendly', 'Private Booths'],
            'created_at' => now()->subDays(4),
        ],
    ],
    'poi-mano-mano' => [
        [
            'author_name' => 'Atty. Bai Sandra Dilangalen',
            'rating' => 5,
            'comment' => 'The Curacha in Ralava Sauce is phenomenal! Spanner crab is so fresh and the sauce is heavenly over hot rice. Strict non-pork and non-alcohol establishment.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Curacha in Ralava Sauce', 'Spanner Crab', 'Strictly Halal Kitchen'],
            'created_at' => now()->subHours(4),
        ],
        [
            'author_name' => 'Dennis Sy (Manila Tourist)',
            'rating' => 5,
            'comment' => 'Best seafood dining in Region IX! DOT accredited and adheres to strict hygiene standards. A must-visit culinary destination.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['DOT Accredited', 'Grilled Seafood'],
            'created_at' => now()->subDays(3),
        ],
    ],
    'poi-canelar' => [
        [
            'author_name' => 'Hadji Amina Kiram',
            'rating' => 5,
            'comment' => 'The go-to market for authentic Malaysian goods, spices, batik, and traditional brassware. Prayer room is located near the central pavilion.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Barter Goods', 'Malaysian Spices', 'Central Musalla'],
            'created_at' => now()->subHours(20),
        ],
        [
            'author_name' => 'Kenneth Go',
            'rating' => 5,
            'comment' => 'Picked up authentic Barter chocolates, Sambal, and Moro souvenirs. Friendly stall owners and safe tourist corridor.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Souvenir Shopping', 'Authentic Sambal'],
            'created_at' => now()->subDays(2),
        ],
    ],
    'poi-fort-pilar' => [
        [
            'author_name' => 'Datu Jamalul',
            'rating' => 5,
            'comment' => 'Centuries of intertwined Spanish, Moro, and Subanen heritage. The museum exhibits are well-curated and deeply educational.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Historic Fort', 'National Museum', 'Centuries of Heritage'],
            'created_at' => now()->subDays(1),
        ],
        [
            'author_name' => 'Maria Elena Santos',
            'rating' => 5,
            'comment' => 'Stunning stone battlements facing the Basilan Strait. Beautiful spot to watch colorful vintas glide by at sunset.',
            'verified_visit' => true,
            'verified_wudu' => false,
            'verified_female_area' => false,
            'dish_tags' => ['Sunset View', 'Vinta Watching'],
            'created_at' => now()->subDays(5),
        ],
    ],
    'poi-sta-barbara' => [
        [
            'author_name' => 'Haji Muktar',
            'rating' => 5,
            'comment' => 'Very active downtown congregation. Khutbah delivered in Chavacano and Tausug. Clean wudu and spacious prayer mats.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Downtown Mosque', 'Chavacano Khutbah'],
            'created_at' => now()->subDays(2),
        ],
    ],
    'poi-rio-hondo' => [
        [
            'author_name' => 'Malik Sinsuat',
            'rating' => 5,
            'comment' => 'Located right by the Rio Hondo bridge on the main road. The call to prayer echoing across the canal is unforgettable.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Rio Hondo Bridge', 'Peaceful Adhan'],
            'created_at' => now()->subDays(4),
        ],
    ],
    'poi-campo-muslim' => [
        [
            'author_name' => 'Hassan Basri',
            'rating' => 5,
            'comment' => 'Very lively Friday congregation and friendly community. Madrasah students and community elders keep the masjid immaculate.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Campo Muslim', 'Friday Congregation'],
            'created_at' => now()->subDays(6),
        ],
    ],
    'poi-kasanyangan-mosque' => [
        [
            'author_name' => 'Nur-Hussein Al-Khatib',
            'rating' => 5,
            'comment' => 'Peaceful neighborhood mosque with ample natural ventilation and dedicated women\'s prayer area.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Natural Ventilation', 'Peaceful'],
            'created_at' => now()->subDays(3),
        ],
    ],
    'poi-mampang-mosque' => [
        [
            'author_name' => 'Farhan Datu',
            'rating' => 5,
            'comment' => 'Great roadside stop when traveling toward eastern Zamboanga. Pristine ablution facilities.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Roadside Musalla', 'Pristine Wudu'],
            'created_at' => now()->subDays(5),
        ],
    ],
    'poi-arena-blanco-mosque' => [
        [
            'author_name' => 'Bilal Asad',
            'rating' => 5,
            'comment' => 'Coastal breeze during Asr and Maghrib prayers is wonderful. Very warm community welcoming visitors.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Coastal Mosque', 'Warm Hospitality'],
            'created_at' => now()->subDays(7),
        ],
    ],
    'poi-malamawi-halal-dining' => [
        [
            'author_name' => 'Khadija Ututalum',
            'rating' => 5,
            'comment' => 'Dining right along the white sand shores of Malamawi. Freshly caught grilled fish and coconut water with certified halal ingredients.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Malamawi White Beach', 'Grilled Catch of the Day'],
            'created_at' => now()->subDays(3),
        ],
    ],
    'poi-masjid-tulay-jolo' => [
        [
            'author_name' => 'Datu Al-Rashid',
            'rating' => 5,
            'comment' => 'The grand symbol of Sulu heritage. Massive dome and minarets with thousands in congregational prayer. Unforgettable spiritual visit.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Jolo Grand Mosque', 'Historic Minarets'],
            'created_at' => now()->subDays(8),
        ],
    ],
    'poi-sheik-makhdum-mosque' => [
        [
            'author_name' => 'Historian Munir Karim',
            'rating' => 5,
            'comment' => 'The first and oldest mosque in the Philippines (Est. 1380 AD). The original ancient ipil wood pillars are preserved inside. A sacred pilgrimage site.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Est. 1380 AD', 'Oldest Mosque in PH', 'Sacred Heritage'],
            'created_at' => now()->subDays(4),
        ],
    ],
    'poi-tawi-tawi-seafront-dining' => [
        [
            'author_name' => 'Aida Solaiman',
            'rating' => 5,
            'comment' => 'The giant mud crabs and fresh ocean prawns overlooking Bongao harbor are world-class! Prepared in strict adherence to halal guidelines.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Giant Mud Crabs', 'Harbor View', 'Fresh Seafood'],
            'created_at' => now()->subDays(2),
        ],
    ],
];

$inserted = 0;
foreach ($demoReviews as $customId => $reviews) {
    $poi = Poi::where('custom_id', $customId)->first();
    if (! $poi) {
        echo "POI not found: {$customId}\n";
        continue;
    }

    foreach ($reviews as $revData) {
        $exists = Review::where('poi_id', $poi->id)
            ->where('author_name', $revData['author_name'])
            ->exists();

        if (! $exists) {
            Review::create([
                'poi_id' => $poi->id,
                'author_name' => $revData['author_name'],
                'rating' => $revData['rating'],
                'comment' => $revData['comment'],
                'verified_visit' => $revData['verified_visit'],
                'verified_wudu' => $revData['verified_wudu'],
                'verified_female_area' => $revData['verified_female_area'],
                'dish_tags' => $revData['dish_tags'],
                'created_at' => $revData['created_at'],
                'updated_at' => $revData['created_at'],
            ]);
            $inserted++;
        }
    }

    // Recalculate POI rating & review count
    $totalReviews = $poi->reviews()->count();
    $avgRating = $poi->reviews()->avg('rating') ?: 5.0;
    $poi->update([
        'review_count' => max($totalReviews, (int)$poi->review_count),
        'rating' => round($avgRating, 1),
    ]);
}

echo "Successfully seeded {$inserted} authentic demo reviews across all POIs!\n";
echo "Total reviews in database now: " . Review::count() . "\n";
