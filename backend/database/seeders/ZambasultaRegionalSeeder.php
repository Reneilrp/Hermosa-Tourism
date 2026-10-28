<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\HalalCertificate;
use App\Models\MsmeApplication;
use App\Models\Poi;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ZambasultaRegionalSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Amenities
        $amenities = [
            'massive_wudu' => Amenity::firstOrCreate(['code' => 'massive_wudu'], ['label' => 'Grand Multi-Station Ablution Area', 'icon' => 'water']),
            'wudu_area' => Amenity::firstOrCreate(['code' => 'wudu_area'], ['label' => 'Running Water Wudu Stations', 'icon' => 'water']),
            'female_section' => Amenity::firstOrCreate(['code' => 'female_section'], ['label' => 'Dedicated Female Prayer Hall/Mezzanine', 'icon' => 'people']),
            'air_conditioned' => Amenity::firstOrCreate(['code' => 'air_conditioned'], ['label' => 'Air-Cooled Prayer Halls', 'icon' => 'snow']),
            'parking' => Amenity::firstOrCreate(['code' => 'parking'], ['label' => 'Visitor Parking Available', 'icon' => 'car']),
            'qibla_aligned' => Amenity::firstOrCreate(['code' => 'qibla_aligned'], ['label' => 'Precision Aligned Qibla Mihrab', 'icon' => 'compass']),
            'wheelchair' => Amenity::firstOrCreate(['code' => 'wheelchair'], ['label' => 'Wheelchair Accessible Ramps', 'icon' => 'body']),
            'near_wmsu' => Amenity::firstOrCreate(['code' => 'near_wmsu'], ['label' => 'Walking Distance to WMSU Campus', 'icon' => 'school']),
            'heritage_marker' => Amenity::firstOrCreate(['code' => 'heritage_marker'], ['label' => 'Official NHCP Heritage Marker', 'icon' => 'ribbon']),
            'halal_kitchen' => Amenity::firstOrCreate(['code' => 'halal_kitchen'], ['label' => '100% Halal Certified Kitchen', 'icon' => 'checkmark-circle']),
            'prayer_room' => Amenity::firstOrCreate(['code' => 'prayer_room'], ['label' => 'Customer Musalla / Prayer Room', 'icon' => 'moon']),
            'alcohol_free' => Amenity::firstOrCreate(['code' => 'alcohol_free'], ['label' => 'Strictly No Alcohol Served', 'icon' => 'ban']),
            'muslim_owned' => Amenity::firstOrCreate(['code' => 'muslim_owned'], ['label' => '100% Muslim-Owned & Operated', 'icon' => 'heart-circle']),
            'halal_meat' => Amenity::firstOrCreate(['code' => 'halal_meat'], ['label' => 'Fresh Halal Butchered Meat', 'icon' => 'checkmark-circle']),
            'market_musalla' => Amenity::firstOrCreate(['code' => 'market_musalla'], ['label' => 'Market Musalla Available', 'icon' => 'moon']),
            'card_payments' => Amenity::firstOrCreate(['code' => 'card_payments'], ['label' => 'Cash & GCash Accepted', 'icon' => 'card']),
            'guided_tours' => Amenity::firstOrCreate(['code' => 'guided_tours'], ['label' => 'Guided Cultural Tours', 'icon' => 'mic']),
            'family_friendly' => Amenity::firstOrCreate(['code' => 'family_friendly'], ['label' => 'Courtyards & Open Gardens', 'icon' => 'people']),
        ];

        // -------------------------------------------------------------
        // A. UPDATE EXISTING ZAMBOANGA CITY PLACES
        // -------------------------------------------------------------
        Poi::whereNull('region')->orWhere('region', '')->update([
            'region' => 'Region IX',
            'province' => 'Zamboanga City',
            'city_municipality' => 'Zamboanga City',
        ]);

        // -------------------------------------------------------------
        // B. BASILAN (Western BARMM)
        // -------------------------------------------------------------
        $isabelaMosque = Poi::updateOrCreate(
            ['custom_id' => 'poi-isabela-grand-mosque'],
            [
                'name' => 'Kaumpurnah Grand Mosque (Isabela City)',
                'slug' => 'kaumpurnah-grand-mosque-isabela',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'BARMM',
                'province' => 'Basilan',
                'city_municipality' => 'Isabela City',
                'latitude' => 6.7042,
                'longitude' => 121.9715,
                'address' => 'Barangay Kaumpurnah, Isabela City, Basilan',
                'phone' => '+63 62 200 3421',
                'cuisine' => 'Premier Grand Masjid of Isabela City',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours (5 Daily Prayers)',
                'image_url' => 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
                'description' => 'The central and largest Grand Mosque of Isabela City, Basilan. Overlooks the vibrant coastal channel with majestic emerald green domes and spacious wudu amenities for travelers arriving via the ferry port.',
                'popular_items' => ['Friday Jumuah Prayers', 'Madrasah Educational Library', 'Traveler Wudu Facilities'],
                'rating' => 4.90,
                'review_count' => 310,
                'is_verified' => true,
            ]
        );
        $isabelaMosque->amenities()->syncWithoutDetaching([$amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['qibla_aligned']->id, $amenities['parking']->id]);

        $malamawiSeafood = Poi::updateOrCreate(
            ['custom_id' => 'poi-malamawi-halal-dining'],
            [
                'name' => 'Malamawi White Beach Halal Pavilion',
                'slug' => 'malamawi-white-beach-halal-pavilion',
                'category' => 'dining',
                'tier' => 'tier2',
                'region' => 'BARMM',
                'province' => 'Basilan',
                'city_municipality' => 'Isabela City (Malamawi Island)',
                'latitude' => 6.7280,
                'longitude' => 121.9540,
                'address' => 'Malamawi Island, Isabela City, Basilan',
                'phone' => '+63 917 554 8820',
                'cuisine' => 'Fresh Catch Halal Grilled Seafood & Yakan Delicacies',
                'price_range' => '₱₱',
                'operating_hours' => '07:00 AM - 06:00 PM Daily',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'description' => 'Premier coastal eco-tourism pavilion in Basilan offering 100% Muslim-owned grilled yellowfin tuna belly, curried mud crabs, and freshly harvested coconut refreshments right by the pristine white beach.',
                'popular_items' => ['Grilled Yellowfin Tuna', 'Spiced Mud Crabs in Coconut Milk', 'Fresh Buko Juice', 'Yakan Rice Cakes'],
                'rating' => 4.85,
                'review_count' => 240,
                'is_verified' => true,
            ]
        );
        $malamawiSeafood->amenities()->syncWithoutDetaching([$amenities['muslim_owned']->id, $amenities['alcohol_free']->id, $amenities['prayer_room']->id, $amenities['family_friendly']->id]);

        $lamitanHeritage = Poi::updateOrCreate(
            ['custom_id' => 'poi-lamitan-datu-kalun'],
            [
                'name' => 'Datu Kalun Cultural Center & Lamitan Masjid',
                'slug' => 'datu-kalun-cultural-center-lamitan',
                'category' => 'cultural',
                'tier' => 'tier1',
                'region' => 'BARMM',
                'province' => 'Basilan',
                'city_municipality' => 'Lamitan City',
                'latitude' => 6.6180,
                'longitude' => 122.1320,
                'address' => 'Plaza Datu Kalun, Centro, Lamitan City, Basilan',
                'phone' => '+63 62 200 8899',
                'cuisine' => 'Yakan & Moro Cultural Heritage Center',
                'price_range' => 'Free',
                'operating_hours' => '08:00 AM - 05:00 PM (Monday - Saturday)',
                'image_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
                'description' => 'Commemorating the famous Yakan leader Datu Kalun, this cultural complex showcases intricate Yakan Tennun weaving patterns, historical artifacts, and an adjacent community prayer space.',
                'popular_items' => ['Yakan Handwoven Textiles', 'Lami-Lamihan Festival Exhibit', 'Traditional Moro Brassware'],
                'rating' => 4.80,
                'review_count' => 195,
                'is_verified' => true,
            ]
        );
        $lamitanHeritage->amenities()->syncWithoutDetaching([$amenities['heritage_marker']->id, $amenities['guided_tours']->id, $amenities['prayer_room']->id]);

        // -------------------------------------------------------------
        // C. SULU (Western BARMM)
        // -------------------------------------------------------------
        $masjidTulay = Poi::updateOrCreate(
            ['custom_id' => 'poi-masjid-tulay-jolo'],
            [
                'name' => 'Masjid Tulay (Jolo Grand Mosque)',
                'slug' => 'masjid-tulay-jolo-grand-mosque',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'BARMM',
                'province' => 'Sulu',
                'city_municipality' => 'Jolo',
                'latitude' => 6.0545,
                'longitude' => 121.0020,
                'address' => 'Barangay Tulay, Jolo, Sulu',
                'phone' => '+63 85 341 2200',
                'cuisine' => 'Oldest & Largest Grand Mosque in Sulu Province',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours Daily',
                'image_url' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
                'description' => 'First constructed in 1884, Masjid Tulay is the historic spiritual epicenter of Sulu. Rebuilt with gleaming white minarets and expansive courtyards accommodating up to 5,000 worshippers.',
                'popular_items' => ['Grand Jumuah Assembly', 'Sultanate Historical Archives', 'Ablution Courtyard'],
                'rating' => 4.95,
                'review_count' => 520,
                'is_verified' => true,
            ]
        );
        $masjidTulay->amenities()->syncWithoutDetaching([$amenities['massive_wudu']->id, $amenities['female_section']->id, $amenities['heritage_marker']->id, $amenities['qibla_aligned']->id]);

        $joloSattiCenter = Poi::updateOrCreate(
            ['custom_id' => 'poi-jolo-satti-culinary'],
            [
                'name' => 'Sultan’s Traditional Tausug Satti & Coffee House',
                'slug' => 'sultans-traditional-tausug-satti-jolo',
                'category' => 'dining',
                'tier' => 'tier2',
                'region' => 'BARMM',
                'province' => 'Sulu',
                'city_municipality' => 'Jolo',
                'latitude' => 6.0520,
                'longitude' => 121.0045,
                'address' => 'Serantes St, Walled City, Jolo, Sulu',
                'phone' => '+63 919 883 4410',
                'cuisine' => 'Authentic Sulu Satti, Kahawa Sug & Bangbang Moro',
                'price_range' => '₱',
                'operating_hours' => '05:30 AM - 08:00 PM Daily',
                'image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
                'description' => 'The premier breakfast institution in Jolo serving fiery sweet-and-spicy satti sauce with beef skewers, ta’mu (rice cubes), authentic Kahawa Sug (Sulu native coffee), and traditional Bangbang Sug pastries.',
                'popular_items' => ['Beef & Liver Satti Sticks', 'Kahawa Sug Fine Roast Coffee', 'Bangbang Sug Pastry Platter', 'Tiula Itum Lunch Set'],
                'rating' => 4.90,
                'review_count' => 380,
                'is_verified' => true,
            ]
        );
        $joloSattiCenter->amenities()->syncWithoutDetaching([$amenities['muslim_owned']->id, $amenities['alcohol_free']->id, $amenities['halal_meat']->id, $amenities['card_payments']->id]);

        // -------------------------------------------------------------
        // D. TAWI-TAWI (Western BARMM)
        // -------------------------------------------------------------
        $sheikMakhdum = Poi::updateOrCreate(
            ['custom_id' => 'poi-sheik-makhdum-mosque'],
            [
                'name' => 'Sheik Karimul Makhdum Mosque (Tubig Indangan)',
                'slug' => 'sheik-karimul-makhdum-mosque-simunul',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'BARMM',
                'province' => 'Tawi-Tawi',
                'city_municipality' => 'Simunul',
                'latitude' => 4.8833,
                'longitude' => 119.8167,
                'address' => 'Barangay Tubig Indangan, Simunul Island, Tawi-Tawi',
                'phone' => '+63 68 268 1111',
                'cuisine' => 'First and Oldest Mosque in the Philippines (Est. 1380 AD)',
                'price_range' => 'National Cultural Treasure (Free)',
                'operating_hours' => 'Open 24 Hours (Historic Pilgrim Site)',
                'image_url' => 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&w=800&q=80',
                'description' => 'Declared a National Historical Landmark and National Cultural Treasure, this sanctuary was established in 1380 AD by Arabian missionary Sheik Karimul Makhdum. Contains the original 600-year-old wooden Ipil pillars inside the sanctuary.',
                'popular_items' => ['Original 1380 AD Sacred Ipil Pillars', 'Sheik Makhdum Historical Shrine', 'Pilgrim Ablution Wells'],
                'rating' => 5.00,
                'review_count' => 740,
                'is_verified' => true,
            ]
        );
        $sheikMakhdum->amenities()->syncWithoutDetaching([$amenities['heritage_marker']->id, $amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['guided_tours']->id, $amenities['qibla_aligned']->id]);
        HalalCertificate::updateOrCreate(
            ['cert_number' => 'NHCP-NCMF-1380-PHIL-01'],
            ['poi_id' => $sheikMakhdum->id, 'cert_body' => 'National Historical Commission of the Philippines & NCMF', 'status' => 'approved', 'valid_until' => '2035-12-31']
        );

        $bongaoMasjid = Poi::updateOrCreate(
            ['custom_id' => 'poi-bongao-central-masjid'],
            [
                'name' => 'Bongao Capital Central Mosque & Musalla',
                'slug' => 'bongao-capital-central-mosque',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'BARMM',
                'province' => 'Tawi-Tawi',
                'city_municipality' => 'Bongao',
                'latitude' => 5.0310,
                'longitude' => 119.7735,
                'address' => 'Djaul St, Poblacion, Bongao, Tawi-Tawi',
                'phone' => '+63 68 268 2233',
                'cuisine' => 'Central Masjid of Tawi-Tawi Capital',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours Daily',
                'image_url' => 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
                'description' => 'The vibrant provincial center of worship in Bongao, Tawi-Tawi. Centrally located near the Bongao Chinese Pier and municipal market, offering well-maintained prayer facilities for transit passengers traveling to Sitangkai and Simunul.',
                'popular_items' => ['Congregational Prayers', 'Seafront Traveler Ablution Station', 'Madrasah'],
                'rating' => 4.88,
                'review_count' => 290,
                'is_verified' => true,
            ]
        );
        $bongaoMasjid->amenities()->syncWithoutDetaching([$amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['qibla_aligned']->id, $amenities['air_conditioned']->id]);

        $tawiTawiSeafood = Poi::updateOrCreate(
            ['custom_id' => 'poi-tawi-tawi-seafront-dining'],
            [
                'name' => 'Bongao Harbor Halal Seafood House',
                'slug' => 'bongao-harbor-halal-seafood-house',
                'category' => 'dining',
                'tier' => 'tier2',
                'region' => 'BARMM',
                'province' => 'Tawi-Tawi',
                'city_municipality' => 'Bongao',
                'latitude' => 5.0290,
                'longitude' => 119.7710,
                'address' => 'Chinese Pier Boardwalk, Bongao, Tawi-Tawi',
                'phone' => '+63 920 445 1199',
                'cuisine' => 'Sama-Badjao & Tausug Exotic Seafood Delights',
                'price_range' => '₱₱',
                'operating_hours' => '10:00 AM - 09:30 PM Daily',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'description' => 'Overlooking the turquoise Celebes Sea, serving fresh mantis shrimp, deep-sea lobster, curried octopus, and Syanglag (toasted cassava) cooked following strict Halal Muslim guidelines.',
                'popular_items' => ['Steamed Mantis Shrimp in Garlic', 'Deep-Sea Green Lobster', 'Syanglag with Grilled Fish', 'Agar-Agar Seaweed Salad'],
                'rating' => 4.92,
                'review_count' => 310,
                'is_verified' => true,
            ]
        );
        $tawiTawiSeafood->amenities()->syncWithoutDetaching([$amenities['muslim_owned']->id, $amenities['alcohol_free']->id, $amenities['prayer_room']->id]);

        // -------------------------------------------------------------
        // E. ZAMBOANGA DEL NORTE (Region IX)
        // -------------------------------------------------------------
        $dipologMasjid = Poi::updateOrCreate(
            ['custom_id' => 'poi-dipolog-grand-mosque'],
            [
                'name' => 'Dipolog Islamic Center & Grand Masjid',
                'slug' => 'dipolog-islamic-center-grand-masjid',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'Region IX',
                'province' => 'Zamboanga del Norte',
                'city_municipality' => 'Dipolog City',
                'latitude' => 8.5833,
                'longitude' => 123.3400,
                'address' => 'Barangay Barra, Dipolog City, Zamboanga del Norte',
                'phone' => '+63 65 212 9900',
                'cuisine' => 'Capital Grand Mosque of Zamboanga del Norte',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours Daily',
                'image_url' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
                'description' => 'The principal Islamic community hub in Dipolog City, featuring pristine prayer halls, wudu ablution stations, and Halal assistance for travelers visiting the orchid capital and Dapitan.',
                'popular_items' => ['Friday Jumuah Prayers', 'Halal Traveler Information Desk', 'Community Musalla'],
                'rating' => 4.85,
                'review_count' => 180,
                'is_verified' => true,
            ]
        );
        $dipologMasjid->amenities()->syncWithoutDetaching([$amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['qibla_aligned']->id, $amenities['parking']->id]);

        // -------------------------------------------------------------
        // F. ZAMBOANGA DEL SUR (Region IX)
        // -------------------------------------------------------------
        $pagadianMasjid = Poi::updateOrCreate(
            ['custom_id' => 'poi-pagadian-grand-mosque'],
            [
                'name' => 'Pagadian City Central Grand Mosque (San Pedro)',
                'slug' => 'pagadian-city-central-grand-mosque',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'Region IX',
                'province' => 'Zamboanga del Sur',
                'city_municipality' => 'Pagadian City',
                'latitude' => 7.8250,
                'longitude' => 123.4370,
                'address' => 'Barangay San Pedro, Pagadian City, Zamboanga del Sur',
                'phone' => '+63 62 214 7711',
                'cuisine' => 'Regional Administrative Center Grand Masjid',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours Daily',
                'image_url' => 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
                'description' => 'Prominently located on the rolling hills of Pagadian City, this grand mosque serves as the regional spiritual center for Muslim residents, officials, and visiting travelers in Region IX.',
                'popular_items' => ['Daily Congregational Prayers', 'Spacious Wudu Hall', 'Islamic Youth Seminars'],
                'rating' => 4.87,
                'review_count' => 220,
                'is_verified' => true,
            ]
        );
        $pagadianMasjid->amenities()->syncWithoutDetaching([$amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['qibla_aligned']->id, $amenities['parking']->id]);

        // -------------------------------------------------------------
        // G. ZAMBOANGA SIBUGAY (Region IX)
        // -------------------------------------------------------------
        $ipilMasjid = Poi::updateOrCreate(
            ['custom_id' => 'poi-ipil-central-mosque'],
            [
                'name' => 'Ipil Municipal Central Mosque & Traveler Musalla',
                'slug' => 'ipil-municipal-central-mosque',
                'category' => 'worship',
                'tier' => 'tier1',
                'region' => 'Region IX',
                'province' => 'Zamboanga Sibugay',
                'city_municipality' => 'Ipil',
                'latitude' => 7.7844,
                'longitude' => 122.5847,
                'address' => 'Poblacion, Ipil, Zamboanga Sibugay',
                'phone' => '+63 62 333 4455',
                'cuisine' => 'Crossroad Transit Mosque for Mindanao Highway Travelers',
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours Daily',
                'image_url' => 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&w=800&q=80',
                'description' => 'Strategically situated at the central highway junction connecting Zamboanga City, Dipolog, and Pagadian. Offers essential prayer rest-stop facilities and wudu rooms for overland travelers.',
                'popular_items' => ['Highway Traveler Musalla', 'Clean Ablution Facility', '24/7 Security'],
                'rating' => 4.80,
                'review_count' => 160,
                'is_verified' => true,
            ]
        );
        $ipilMasjid->amenities()->syncWithoutDetaching([$amenities['wudu_area']->id, $amenities['female_section']->id, $amenities['parking']->id]);

        // -------------------------------------------------------------
        // 2. SAMPLE MSME SELF-DECLARATION APPLICATIONS
        // -------------------------------------------------------------
        MsmeApplication::updateOrCreate(
            ['application_number' => 'MSME-2026-001'],
            [
                'business_name' => 'Al-Mubarak Satti & Tausug Native Grill',
                'owner_name' => 'Ustadz Ibrahim Sali',
                'contact_phone' => '+63 917 112 3344',
                'email' => 'almubarak.satti@gmail.com',
                'region' => 'BARMM',
                'province' => 'Basilan',
                'city_municipality' => 'Isabela City',
                'address' => 'Barangay Sunrise, Isabela City, Basilan',
                'category' => 'dining',
                'target_tier' => 'tier2',
                'cuisine_specialty' => 'Tausug Satti & Charcoal Grilled Chicken Skewers',
                'meat_supplier_name' => 'Basilan Islamic Abattoir & Halal Meat Cooperative',
                'strictly_no_pork_alcohol' => true,
                'has_prayer_corner' => true,
                'kitchen_practices_description' => '100% Muslim-owned and operated kitchen. All chicken and beef sourced exclusively from accredited Halal meat suppliers with daily slaughter certificates. Cookware and utensils strictly segregated from non-Halal ingredients. No alcohol permitted anywhere on premises.',
                'status' => 'pending',
                'admin_notes' => 'Awaiting field inspector verification for Tier 2 Muslim-Owned badge.',
            ]
        );

        MsmeApplication::updateOrCreate(
            ['application_number' => 'MSME-2026-002'],
            [
                'business_name' => 'Simunul Island Buko & Fresh Seafood Rest Stop',
                'owner_name' => 'Hadja Fatima Abubakar',
                'contact_phone' => '+63 920 887 6655',
                'email' => 'fatima.simunul@yahoo.com',
                'region' => 'BARMM',
                'province' => 'Tawi-Tawi',
                'city_municipality' => 'Simunul',
                'address' => 'Near Sheik Makhdum Mosque, Tubig Indangan, Simunul, Tawi-Tawi',
                'category' => 'dining',
                'target_tier' => 'tier2',
                'cuisine_specialty' => 'Fresh Catch Seafood, Grilled Tuna & Cassava Cakes',
                'meat_supplier_name' => 'Local Simunul Fishermen Association (Fresh Marine Catch)',
                'strictly_no_pork_alcohol' => true,
                'has_prayer_corner' => true,
                'kitchen_practices_description' => 'Operates adjacent to the historic Sheik Makhdum Mosque. Serves freshly harvested sea produce and plant-based traditional cakes with zero animal fats or non-Halal seasonings.',
                'status' => 'approved',
                'admin_notes' => 'Approved as Tier 2 Muslim-Owned Food Provider following Islamic community leader endorsement.',
            ]
        );
    }
}
