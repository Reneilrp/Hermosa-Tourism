<?php

namespace Database\Seeders;

use App\Models\PackageBooking;
use App\Models\TourGuide;
use App\Models\TourPackage;
use Illuminate\Database\Seeder;

class PackageAndGuideSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tour Packages (A, B, C)
        $pkgA = TourPackage::updateOrCreate(
            ['package_code' => 'package_a'],
            [
                'code_label' => 'PACKAGE A',
                'title' => 'Guided Tour Package (All-Inclusive)',
                'tagline' => 'VIP Guided Tour with Accredited Guide & Private Transfers',
                'badge' => 'MOST POPULAR FOR FAMILIES',
                'badge_color' => '#0B6E4F',
                'badge_bg' => '#E8F5EE',
                'price_php' => 6500.00,
                'price_unit' => '/ person (all-inclusive)',
                'duration' => '3 Days / 2 Nights',
                'is_prayer_aligned' => true,
                'inclusions_matrix' => [
                    'transportation' => 'Private Air-Conditioned Van with dedicated airport transfers & city circuit navigation',
                    'fees' => 'All Entrance Fees, Environmental Fees & Barangay Cultural Permits included',
                    'activities' => 'Curated Yakan Weaving Demonstration, Tiula Itum masterclass, and Islamic Heritage Q&A',
                    'attractions' => 'Fort Pilar National Museum, Taluksangay Historic Mosque (1885), and Sadik Grand Mosque',
                ],
                'inclusions' => [
                    ['icon' => 'person', 'text' => 'Accredited Bilingual Tour Guide (English / Chavacano / Tausug / Arabic)'],
                    ['icon' => 'car', 'text' => 'Private Air-Conditioned Van & Dedicated City Transfers (Transportation)'],
                    ['icon' => 'ticket', 'text' => 'All Entrance & Environmental Fees Included (VIP Cultural Pass)'],
                    ['icon' => 'restaurant', 'text' => 'Pre-Arranged 3-Course Halal Dining at Baitul Maal & Sinned Coffee'],
                    ['icon' => 'moon', 'text' => 'Prayer-Aligned Mosque Stops: Sadiq Grand Mosque & Taluksangay (Attractions)'],
                    ['icon' => 'shield-checkmark', 'text' => 'Travel Insurance & Regional Security Escort Coordination'],
                ],
                'prayer_itinerary' => [
                    ['time' => '04:30 AM', 'prayer' => 'Fajr', 'location' => 'Taluksangay Historic Mosque', 'activity' => 'Dawn prayer & sunrise historical reflection at oldest minarets'],
                    ['time' => '08:30 AM', 'prayer' => null, 'location' => 'Fort Pilar & National Museum', 'activity' => 'Cultural exploration & 17th-century fortress heritage walkthrough'],
                    ['time' => '11:45 AM', 'prayer' => 'Dhuhr', 'location' => 'Sadik Grand Mosque (Mercedes)', 'activity' => 'Midday congregational prayer & architectural tour of largest mosque in Zamboanga'],
                    ['time' => '01:00 PM', 'prayer' => null, 'location' => 'Baitul Maal Native Halal Bistro', 'activity' => 'Royal 3-Course Halal feast (Tiula Itum, Chicken Pyanggang, Kulma)'],
                    ['time' => '02:30 PM', 'prayer' => null, 'location' => 'Yakan Weaving Center & Canelar Souk', 'activity' => 'Artisan textile masterclass & halal souvenir gathering'],
                    ['time' => '03:15 PM', 'prayer' => 'Asr', 'location' => 'Masjid Sta. Barbara', 'activity' => 'Afternoon prayer & community dialogue with local elders'],
                    ['time' => '04:30 PM', 'prayer' => null, 'location' => 'Paseo del Mar Coastal Esplanade', 'activity' => 'Sunset walk overlooking Santa Cruz Island and Sulu Sea'],
                    ['time' => '06:00 PM', 'prayer' => 'Maghrib', 'location' => 'Masjid Rio Hondo', 'activity' => 'Sunset prayer overlooking stilt village waterways'],
                    ['time' => '07:15 PM', 'prayer' => 'Isha', 'location' => 'Masjid Campo Muslim', 'activity' => 'Night prayer followed by celebratory dinner at Ralava Mano-Mano Grill'],
                ],
                'ideal_for' => 'Families, international pilgrims, senior citizens, and first-time visitors.',
                'comparison_guide' => 'Dedicated Bilingual',
                'comparison_tickets' => 'Included (All Venue Admissions)',
                'comparison_meals' => 'Reserved 3-Course Halal',
                'comparison_offline' => 'Guided Route',
                'sort_order' => 1,
                'is_active' => true,
            ]
        );

        $pkgB = TourPackage::updateOrCreate(
            ['package_code' => 'package_b'],
            [
                'code_label' => 'PACKAGE B',
                'title' => 'Flexible Tour Pass',
                'tagline' => 'Recommended Itinerary & Pre-Arranged City Logistics',
                'badge' => 'RECOMMENDED FOR TRAVELERS',
                'badge_color' => '#D97706',
                'badge_bg' => '#FEF3C7',
                'price_php' => 2400.00,
                'price_unit' => '/ person',
                'duration' => '2-3 Days Flexible',
                'is_prayer_aligned' => true,
                'inclusions_matrix' => [
                    'transportation' => 'Pre-arranged city loop tricycle & commuter passes with turn-by-turn mobile GPS',
                    'fees' => 'Priority Admission Passes to Heritage Sites, Fort Pilar & Cultural Centers',
                    'activities' => 'Geo-triggered audio guide at historic markers & 15% discount vouchers at partner MSME Halal eateries',
                    'attractions' => 'Sadik Grand Mosque, Fort Pilar, Pasonanca Park, and Canelar Souk',
                ],
                'inclusions' => [
                    ['icon' => 'navigate', 'text' => 'Curated 3-Day Zamboanga Smart Itinerary with Turn-by-Turn GPS (Transportation)'],
                    ['icon' => 'ticket', 'text' => 'Priority Admission Passes to Heritage Sites & Cultural Centers (Fees & Attractions)'],
                    ['icon' => 'pricetag', 'text' => '15% Exclusive Food Discounts at Partner MSME Halal Eateries (Activities)'],
                    ['icon' => 'volume-high', 'text' => 'Geo-Triggered Digital Voice Audio Guide at Historic Markers'],
                    ['icon' => 'compass', 'text' => 'Prayer-Aligned Mosque Stops: Sadiq Grand Mosque 11-12 PM Dhuhr Alert'],
                ],
                'prayer_itinerary' => [
                    ['time' => '11:45 AM', 'prayer' => 'Dhuhr', 'location' => 'Sadik Grand Mosque', 'activity' => 'Self-guided tour & Dhuhr prayer pause'],
                    ['time' => '03:15 PM', 'prayer' => 'Asr', 'location' => 'Masjid Baliwasan (WMSU)', 'activity' => 'Asr prayer pause during heritage campus exploration'],
                    ['time' => '06:00 PM', 'prayer' => 'Maghrib', 'location' => 'Paseo del Mar / Fort Pilar', 'activity' => 'Maghrib prayer at historic fort prayer hall'],
                ],
                'ideal_for' => 'Couples, young travelers, and weekend explorers wanting freedom with hassle-free transit.',
                'comparison_guide' => 'Digital Audio App Guide',
                'comparison_tickets' => 'Included (Heritage Passes)',
                'comparison_meals' => '15% Partner MSME Vouchers',
                'comparison_offline' => 'Yes (Smart Sync)',
                'sort_order' => 2,
                'is_active' => true,
            ]
        );

        $pkgC = TourPackage::updateOrCreate(
            ['package_code' => 'package_c'],
            [
                'code_label' => 'PACKAGE C',
                'title' => 'Self-Guided DIY Tour',
                'tagline' => '100% Free & Self-Guided Route Planner',
                'badge' => '100% FREE / COMMUNITY',
                'badge_color' => '#0284C7',
                'badge_bg' => '#E0F2FE',
                'price_php' => 0.00,
                'price_unit' => 'Free Platform Access',
                'duration' => 'Custom / Anytime',
                'is_prayer_aligned' => true,
                'inclusions_matrix' => [
                    'transportation' => 'Zamboanga City Commuter Transit & Jeepney/Tricycle Fare Guide',
                    'fees' => 'Self-pay on site (100% free public platform routing)',
                    'activities' => 'Community reviews, pilgrim ratings, and custom route builder',
                    'attractions' => 'Any verified mosque, halal eatery, or barter souk in directory',
                ],
                'inclusions' => [
                    ['icon' => 'construct', 'text' => 'Custom Itinerary Builder: Pin any Mosque, Halal cafe, or landmark'],
                    ['icon' => 'cloud-offline', 'text' => '1-Click Offline Data Download for zero-connectivity navigation'],
                    ['icon' => 'navigate', 'text' => 'Zamboanga City Commuter Transit & Jeepney/Tricycle Route Guide (Transportation)'],
                    ['icon' => 'call', 'text' => 'Direct MSME Stalls Contact Directory (No middleman booking fees)'],
                    ['icon' => 'chatbubbles', 'text' => 'Community Reviews, Pilgrim Ratings & Verification checkmarks'],
                ],
                'prayer_itinerary' => [
                    ['time' => 'All Day', 'prayer' => '5 Daily Prayers', 'location' => 'Nearest Masjid via GPS HUD', 'activity' => 'Real-time Qibla compass & prayer calculation alerts across city'],
                ],
                'ideal_for' => 'Backpackers, budget solo travelers, students, and autonomous locals.',
                'comparison_guide' => 'Self-Guided DIY',
                'comparison_tickets' => 'Not Required / Free Public Access',
                'comparison_meals' => 'Direct MSME Street Food',
                'comparison_offline' => 'Full Offline Cache',
                'sort_order' => 3,
                'is_active' => true,
            ]
        );

        // 2. Accredited Tour Guides (DOT / NCMF Certified)
        $guide1 = TourGuide::updateOrCreate(
            ['accreditation_number' => 'DOT-IX-TG-2026-088'],
            [
                'name' => 'Ustadz Yasser Al-Husseini',
                'languages' => ['English', 'Tausug', 'Chavacano', 'Arabic'],
                'contact_phone' => '+63 917 882 1100',
                'email' => 'yasser.alhusseini@hermosa-guides.ph',
                'rating' => 4.98,
                'trips_completed' => 142,
                'specialties' => 'Grand Mosque History, Islamic Architecture & Interfaith Heritage',
                'status' => 'available',
                'avatar_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
            ]
        );

        $guide2 = TourGuide::updateOrCreate(
            ['accreditation_number' => 'DOT-IX-TG-2026-042'],
            [
                'name' => 'Fatima Marisa Tan',
                'languages' => ['Chavacano', 'English', 'Tagalog', 'Sinama'],
                'contact_phone' => '+63 920 771 9933',
                'email' => 'marisa.tan@hermosa-guides.ph',
                'rating' => 4.95,
                'trips_completed' => 98,
                'specialties' => 'ZAMBASULTA Sea Corridors, Malamawi White Beach & Coastal Culture',
                'status' => 'available',
                'avatar_url' => 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
            ]
        );

        $guide3 = TourGuide::updateOrCreate(
            ['accreditation_number' => 'DOT-IX-TG-2026-015'],
            [
                'name' => 'Al-Rashid Abubakar',
                'languages' => ['Tausug', 'English', 'Malay', 'Arabic'],
                'contact_phone' => '+63 918 334 5522',
                'email' => 'rashid.abubakar@hermosa-guides.ph',
                'rating' => 4.92,
                'trips_completed' => 176,
                'specialties' => 'BIMP-EAGA International Delegations & Sulu Sultanate Archives',
                'status' => 'on_tour',
                'avatar_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
            ]
        );

        $guide4 = TourGuide::updateOrCreate(
            ['accreditation_number' => 'DOT-IX-TG-2026-079'],
            [
                'name' => 'Nur-Aina Sali',
                'languages' => ['English', 'Chavacano', 'Tausug'],
                'contact_phone' => '+63 917 550 4411',
                'email' => 'nuraina.sali@hermosa-guides.ph',
                'rating' => 4.96,
                'trips_completed' => 84,
                'specialties' => 'Halal Moro Gastronomy, Satti Trails & Yakan Weaving Traditions',
                'status' => 'available',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
            ]
        );

        // 3. Sample Tourist Bookings with Detailed Multi-Guest Passenger Rosters
        PackageBooking::updateOrCreate(
            ['booking_reference' => 'PKG-2026-8849'],
            [
                'tour_package_id' => $pkgA->id,
                'assigned_guide_id' => $guide1->id,
                'user_name' => 'Ahmad bin Abdullah',
                'user_email' => 'ahmad.abdullah@gmail.com',
                'user_phone' => '+60 12 345 6789',
                'user_nationality' => 'Malaysia / BIMP-EAGA',
                'user_role' => 'foreign_tourist',
                'pax_count' => 2,
                'tourist_roster' => [
                    [
                        'full_name' => 'Ahmad bin Abdullah',
                        'nickname' => 'Ahmad',
                        'age' => 45,
                        'gender' => 'Male',
                        'address' => 'Jalan Ampang, Kuala Lumpur, Malaysia',
                        'id_type' => 'Passport',
                        'id_number' => 'MY-A89214732',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'None (Strict Halal)',
                        'emergency_contact_name' => 'Dr. Zulaikha Abdullah',
                        'emergency_contact_phone' => '+60 12 998 1234',
                    ],
                    [
                        'full_name' => 'Siti Mariam binti Ismail',
                        'nickname' => 'Mariam',
                        'age' => 42,
                        'gender' => 'Female',
                        'address' => 'Jalan Ampang, Kuala Lumpur, Malaysia',
                        'id_type' => 'Passport',
                        'id_number' => 'MY-A89214733',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'Peanut allergy (anaphylaxis cautious)',
                        'emergency_contact_name' => 'Ahmad bin Abdullah',
                        'emergency_contact_phone' => '+60 12 345 6789',
                    ],
                ],
                'travel_date' => now()->addDays(3)->toDateString(),
                'currency_preference' => 'MYR',
                'payment_channel' => 'gcash',
                'payment_status' => 'paid',
                'payment_reference' => 'GCASH-981048291',
                'base_price' => 13000.00,
                'gateway_fee' => 275.00,
                'total_amount_paid' => 13275.00,
                'voucher_code' => 'VOUCH-PKG-2026-8849',
                'auto_confirmed' => true,
                'paid_at' => now()->subDay(),
                'estimated_total' => 13275.00,
                'guide_language_preference' => 'Arabic & English',
                'special_requests' => 'Dietary Halal strict check. Please arrange visit to Taluksangay historic mosque and Sadik Grand Mosque.',
                'status' => 'confirmed',
                'admin_notes' => 'Private AC van dispatched. Auto-confirmed via GCash gateway. Guide Ustadz Yasser assigned for Arabic translation.',
            ]
        );

        PackageBooking::updateOrCreate(
            ['booking_reference' => 'PKG-2026-9122'],
            [
                'tour_package_id' => $pkgB->id,
                'assigned_guide_id' => null,
                'user_name' => 'Tariq Al-Hashimi',
                'user_email' => 'tariq.hashimi@almanar.ae',
                'user_phone' => '+971 50 123 4567',
                'user_nationality' => 'United Arab Emirates',
                'user_role' => 'halal_tourist',
                'pax_count' => 4,
                'tourist_roster' => [
                    [
                        'full_name' => 'Tariq Al-Hashimi',
                        'nickname' => 'Tariq',
                        'age' => 52,
                        'gender' => 'Male',
                        'address' => 'Al-Bateen District, Abu Dhabi, UAE',
                        'id_type' => 'Passport',
                        'id_number' => 'UAE-N782109',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'None',
                        'emergency_contact_name' => 'Omar Al-Hashimi',
                        'emergency_contact_phone' => '+971 50 998 8776',
                    ],
                    [
                        'full_name' => 'Fatima Al-Zahra Al-Hashimi',
                        'nickname' => 'Fatima',
                        'age' => 50,
                        'gender' => 'Female',
                        'address' => 'Al-Bateen District, Abu Dhabi, UAE',
                        'id_type' => 'Passport',
                        'id_number' => 'UAE-N782110',
                        'is_pwd' => true,
                        'pwd_details' => 'Senior / Reduced mobility (wheelchair accessible ramp needed)',
                        'dietary_allergies' => 'Gluten sensitivity',
                        'emergency_contact_name' => 'Tariq Al-Hashimi',
                        'emergency_contact_phone' => '+971 50 123 4567',
                    ],
                    [
                        'full_name' => 'Omar Tariq Al-Hashimi',
                        'nickname' => 'Omar',
                        'age' => 24,
                        'gender' => 'Male',
                        'address' => 'Al-Bateen District, Abu Dhabi, UAE',
                        'id_type' => 'Passport',
                        'id_number' => 'UAE-N782111',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'None',
                        'emergency_contact_name' => 'Tariq Al-Hashimi',
                        'emergency_contact_phone' => '+971 50 123 4567',
                    ],
                    [
                        'full_name' => 'Layla Tariq Al-Hashimi',
                        'nickname' => 'Layla',
                        'age' => 20,
                        'gender' => 'Female',
                        'address' => 'Al-Bateen District, Abu Dhabi, UAE',
                        'id_type' => 'Passport',
                        'id_number' => 'UAE-N782112',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'Lactose intolerance',
                        'emergency_contact_name' => 'Tariq Al-Hashimi',
                        'emergency_contact_phone' => '+971 50 123 4567',
                    ],
                ],
                'travel_date' => now()->addDays(7)->toDateString(),
                'currency_preference' => 'USD',
                'payment_channel' => 'landbank_official',
                'payment_status' => 'pending_verification',
                'payment_reference' => 'LBP-SOA-2026-90412',
                'base_price' => 9600.00,
                'gateway_fee' => 0.00,
                'total_amount_paid' => 9600.00,
                'proof_of_payment_url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
                'voucher_code' => null,
                'auto_confirmed' => false,
                'estimated_total' => 9600.00,
                'guide_language_preference' => 'English',
                'special_requests' => 'Requires prayer time reminders for Dhuhr and Asr between city and cultural sites.',
                'status' => 'pending',
                'admin_notes' => 'Official LandBank Statement of Account (SOA) uploaded. Pending Treasury verification.',
            ]
        );

        PackageBooking::updateOrCreate(
            ['booking_reference' => 'PKG-2026-7730'],
            [
                'tour_package_id' => $pkgA->id,
                'assigned_guide_id' => $guide4->id,
                'user_name' => 'Hajah Dayang Bolkiah',
                'user_email' => 'dayang.bolkiah@brunet.bn',
                'user_phone' => '+673 881 2233',
                'user_nationality' => 'Brunei Darussalam',
                'user_role' => 'foreign_tourist',
                'pax_count' => 3,
                'tourist_roster' => [
                    [
                        'full_name' => 'Hajah Dayang Bolkiah',
                        'nickname' => 'Dayang',
                        'age' => 48,
                        'gender' => 'Female',
                        'address' => 'Bandar Seri Begawan, Brunei Darussalam',
                        'id_type' => 'Passport',
                        'id_number' => 'BN-E2390145',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'Crustacean shellfish allergy',
                        'emergency_contact_name' => 'Pengiran Haji Idris',
                        'emergency_contact_phone' => '+673 872 1199',
                    ],
                    [
                        'full_name' => 'Pengiran Haji Idris',
                        'nickname' => 'Idris',
                        'age' => 51,
                        'gender' => 'Male',
                        'address' => 'Bandar Seri Begawan, Brunei Darussalam',
                        'id_type' => 'Passport',
                        'id_number' => 'BN-E2390146',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'None',
                        'emergency_contact_name' => 'Hajah Dayang Bolkiah',
                        'emergency_contact_phone' => '+673 881 2233',
                    ],
                    [
                        'full_name' => 'Dayang Anisah Bolkiah',
                        'nickname' => 'Anisah',
                        'age' => 19,
                        'gender' => 'Female',
                        'address' => 'Bandar Seri Begawan, Brunei Darussalam',
                        'id_type' => 'Passport',
                        'id_number' => 'BN-E2390147',
                        'is_pwd' => false,
                        'pwd_details' => 'None',
                        'dietary_allergies' => 'None',
                        'emergency_contact_name' => 'Pengiran Haji Idris',
                        'emergency_contact_phone' => '+673 872 1199',
                    ],
                ],
                'travel_date' => now()->subDays(5)->toDateString(),
                'currency_preference' => 'PHP',
                'payment_channel' => 'credit_card',
                'payment_status' => 'paid',
                'payment_reference' => 'CARD-AUTH-98310',
                'base_price' => 19500.00,
                'gateway_fee' => 697.50,
                'total_amount_paid' => 20197.50,
                'voucher_code' => 'VOUCH-PKG-2026-7730',
                'auto_confirmed' => true,
                'paid_at' => now()->subDays(6),
                'estimated_total' => 20197.50,
                'guide_language_preference' => 'Malay & English',
                'special_requests' => 'Focus on indigenous Moro textile art and authentic Halal culinary experiences.',
                'status' => 'completed',
                'admin_notes' => 'Tour completed with 5.0 rating feedback. Auto-confirmed via card gateway. Guided by Nur-Aina Sali.',
            ]
        );
    }
}
