<?php

namespace Database\Seeders;

use App\Models\Amenity;
use App\Models\HalalCertificate;
use App\Models\Poi;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ZamboangaPoiSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Core Halal & Mosque Amenities
        $amenities = [
            'massive_wudu' => Amenity::create(['code' => 'massive_wudu', 'label' => 'Grand Multi-Station Ablution Area', 'icon' => 'water']),
            'wudu_area' => Amenity::create(['code' => 'wudu_area', 'label' => 'Running Water Wudu Stations', 'icon' => 'water']),
            'female_section' => Amenity::create(['code' => 'female_section', 'label' => 'Dedicated Female Prayer Hall/Mezzanine', 'icon' => 'people']),
            'air_conditioned' => Amenity::create(['code' => 'air_conditioned', 'label' => 'Air-Cooled Prayer Halls', 'icon' => 'snow']),
            'parking' => Amenity::create(['code' => 'parking', 'label' => 'Visitor Parking Available', 'icon' => 'car']),
            'qibla_aligned' => Amenity::create(['code' => 'qibla_aligned', 'label' => 'Precision Aligned Qibla Mihrab', 'icon' => 'compass']),
            'wheelchair' => Amenity::create(['code' => 'wheelchair', 'label' => 'Wheelchair Accessible Ramps', 'icon' => 'body']),
            'near_wmsu' => Amenity::create(['code' => 'near_wmsu', 'label' => 'Walking Distance to WMSU Campus', 'icon' => 'school']),
            'heritage_marker' => Amenity::create(['code' => 'heritage_marker', 'label' => 'Official NHCP Heritage Marker', 'icon' => 'ribbon']),
            'halal_kitchen' => Amenity::create(['code' => 'halal_kitchen', 'label' => '100% Halal Certified Kitchen', 'icon' => 'checkmark-circle']),
            'prayer_room' => Amenity::create(['code' => 'prayer_room', 'label' => 'Customer Musalla / Prayer Room', 'icon' => 'moon']),
            'alcohol_free' => Amenity::create(['code' => 'alcohol_free', 'label' => 'Strictly No Alcohol Served', 'icon' => 'ban']),
            'muslim_owned' => Amenity::create(['code' => 'muslim_owned', 'label' => '100% Muslim-Owned & Operated', 'icon' => 'heart-circle']),
            'halal_meat' => Amenity::create(['code' => 'halal_meat', 'label' => 'Fresh Halal Butchered Meat', 'icon' => 'checkmark-circle']),
            'market_musalla' => Amenity::create(['code' => 'market_musalla', 'label' => 'Market Musalla Available', 'icon' => 'moon']),
            'card_payments' => Amenity::create(['code' => 'card_payments', 'label' => 'Cash & GCash Accepted', 'icon' => 'card']),
            'guided_tours' => Amenity::create(['code' => 'guided_tours', 'label' => 'Guided Cultural Tours', 'icon' => 'mic']),
            'family_friendly' => Amenity::create(['code' => 'family_friendly', 'label' => 'Courtyards & Open Gardens', 'icon' => 'people']),
        ];

        // 2. Sadik Grand Mosque (Mercedes) - Largest in Zamboanga City
        $sadik = Poi::create([
            'custom_id' => 'poi-sadik-grand-mosque',
            'name' => 'Sadik Grand Mosque (Mercedes)',
            'slug' => 'sadik-grand-mosque-mercedes',
            'category' => 'worship',
            'tier' => 'tier1',
            'latitude' => 6.9580,
            'longitude' => 122.1400,
            'address' => 'MCLL Highway, Barangay Mercedes, Zamboanga City',
            'phone' => '+63 62 991 9900',
            'cuisine' => 'Largest Grand Mosque in Zamboanga City',
            'price_range' => 'Free',
            'operating_hours' => 'Open 24 Hours (All 5 Prayers, Jumuah & Eid)',
            'image_url' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
            'description' => 'The largest and most majestic Grand Mosque in Zamboanga City, located in Barangay Mercedes. Renowned for its breathtaking golden-green central domes, towering minarets, and an expansive multi-tiered prayer hall capable of hosting thousands of worshippers for Friday Jumuah and Eid prayers.',
            'popular_items' => ['Friday Congregational Jumuah', 'Islamic Educational Center', 'Free Zamzam & Date Dispensary'],
            'rating' => 5.00,
            'review_count' => 920,
            'is_verified' => true,
        ]);
        $sadik->amenities()->attach([
            $amenities['massive_wudu']->id,
            $amenities['female_section']->id,
            $amenities['air_conditioned']->id,
            $amenities['parking']->id,
            $amenities['qibla_aligned']->id,
            $amenities['wheelchair']->id,
        ]);
        HalalCertificate::create([
            'poi_id' => $sadik->id,
            'cert_body' => 'Zamboanga City Islamic Council & NCMF',
            'cert_number' => 'MOSQ-ZAM-SADIK-01',
            'status' => 'approved',
            'valid_until' => '2030-12-31',
        ]);
        Review::create([
            'poi_id' => $sadik->id,
            'author_name' => 'Dr. Faisal Rahman',
            'rating' => 5,
            'comment' => 'Truly the crowning jewel of Islamic architecture in Zamboanga City! The Sadik Grand Mosque in Mercedes is immensely spacious, impeccably clean, and the acoustics during prayer are awe-inspiring.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Sadik Grand Mosque', 'Mercedes Landmark'],
        ]);

        // 3. Masjid Baliwasan (WMSU Campus Mosque)
        $baliwasan = Poi::create([
            'custom_id' => 'poi-baliwasan-mosque',
            'name' => 'Masjid Baliwasan (WMSU Campus Mosque)',
            'slug' => 'masjid-baliwasan-wmsu',
            'category' => 'worship',
            'tier' => 'tier1',
            'latitude' => 6.9142,
            'longitude' => 122.0590,
            'address' => 'Normal Road / Baliwasan Chico, Zamboanga City (Near WMSU)',
            'phone' => '+63 62 991 7711',
            'cuisine' => 'University District Community Mosque',
            'price_range' => 'Free',
            'operating_hours' => 'Open Daily (All 5 Prayers)',
            'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
            'description' => 'Convenient community mosque located right beside the WMSU Main Campus in Baliwasan. Frequented by university students, faculty, and local residents for daily prayers and Friday Jumuah.',
            'popular_items' => ['Student Halal Study Circle', 'Daily Congregational Prayers'],
            'rating' => 4.90,
            'review_count' => 310,
            'is_verified' => true,
        ]);
        $baliwasan->amenities()->attach([
            $amenities['wudu_area']->id,
            $amenities['female_section']->id,
            $amenities['near_wmsu']->id,
            $amenities['qibla_aligned']->id,
        ]);
        HalalCertificate::create([
            'poi_id' => $baliwasan->id,
            'cert_body' => 'Baliwasan Islamic Association',
            'cert_number' => 'MOSQ-ZAM-BAL-07',
            'status' => 'approved',
            'valid_until' => '2028-12-31',
        ]);

        // 4. Taluksangay Historic Mosque (Est. 1885)
        $taluksangay = Poi::create([
            'custom_id' => 'poi-taluksangay',
            'name' => 'Taluksangay Historic Mosque (Est. 1885)',
            'slug' => 'taluksangay-historic-mosque',
            'category' => 'worship',
            'tier' => 'tier1',
            'latitude' => 6.9555,
            'longitude' => 122.1795,
            'address' => 'Taluksangay Road, Barangay Taluksangay, Zamboanga City',
            'phone' => '+63 62 992 1122',
            'cuisine' => 'Oldest Mosque in Western Mindanao (Est. 1885)',
            'price_range' => 'Free',
            'operating_hours' => 'Open Daily (04:30 AM - 08:30 PM)',
            'image_url' => 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
            'description' => 'Built in 1885 by Hadji Abdullah Maas Nuno, Taluksangay Mosque is the oldest historical mosque in Zamboanga and Western Mindanao. Famous for its brilliant emerald green minarets and peaceful coastal village ambiance.',
            'popular_items' => ['Historical Heritage Tour', 'Community Assembly'],
            'rating' => 4.90,
            'review_count' => 512,
            'is_verified' => true,
        ]);
        $taluksangay->amenities()->attach([
            $amenities['wudu_area']->id,
            $amenities['female_section']->id,
            $amenities['heritage_marker']->id,
            $amenities['parking']->id,
        ]);
        HalalCertificate::create([
            'poi_id' => $taluksangay->id,
            'cert_body' => 'National Historical Commission of the Philippines',
            'cert_number' => 'MOSQ-ZAM-1885-01',
            'status' => 'approved',
            'valid_until' => '2035-12-31',
        ]);

        // 5. Bay Tal Mal Authentic Halal Restaurant
        $bayTalMal = Poi::create([
            'custom_id' => 'poi-bay-tal-mal',
            'name' => 'Bay Tal Mal Authentic Halal Restaurant',
            'slug' => 'bay-tal-mal-halal-restaurant',
            'category' => 'dining',
            'tier' => 'tier1',
            'latitude' => 6.9150,
            'longitude' => 122.0735,
            'address' => 'Mayor Jaldon St, Downtown, Zamboanga City',
            'phone' => '+63 62 991 3344',
            'cuisine' => 'Authentic Tausug Specialties (Tiula Itum, Kulma, Pyanggang)',
            'price_range' => '$$',
            'operating_hours' => '10:00 AM - 09:30 PM',
            'image_url' => 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            'description' => 'The premier Halal dining restaurant in Zamboanga City for authentic Tausug royalty cuisine. Renowned for its rich Tiula Itum (black beef soup infused with charred coconut), Beef Kulma, and Chicken Pyanggang.',
            'popular_items' => ['Royal Beef Tiula Itum', 'Chicken Pyanggang in Burnt Coconut', 'Beef Kulma with Fragrant Rice', 'Spiced Liyabihan'],
            'rating' => 4.90,
            'review_count' => 450,
            'is_verified' => true,
        ]);
        $bayTalMal->amenities()->attach([
            $amenities['halal_kitchen']->id,
            $amenities['prayer_room']->id,
            $amenities['wudu_area']->id,
            $amenities['alcohol_free']->id,
            $amenities['air_conditioned']->id,
        ]);
        HalalCertificate::create([
            'poi_id' => $bayTalMal->id,
            'cert_body' => 'NCMF Halal Certified Kitchen',
            'cert_number' => 'NCMF-ZAM-2024-114',
            'status' => 'approved',
            'valid_until' => '2026-12-31',
        ]);
        Review::create([
            'poi_id' => $bayTalMal->id,
            'author_name' => 'Nadia Hassan',
            'rating' => 5,
            'comment' => 'The best Tiula Itum in Zamboanga! The beef was so tender and the broth rich with roasted pamapa. Clean prayer room upstairs.',
            'verified_visit' => true,
            'verified_wudu' => true,
            'verified_female_area' => true,
            'dish_tags' => ['Tiula Itum', 'Chicken Pyanggang'],
        ]);

        // 6. Jimmy’s Satti & Halal Eatery
        $jimmys = Poi::create([
            'custom_id' => 'poi-jimmys-satti',
            'name' => 'Jimmy’s Satti & Halal Eatery',
            'slug' => 'jimmys-satti-halal-eatery',
            'category' => 'dining',
            'tier' => 'tier2',
            'latitude' => 6.9105,
            'longitude' => 122.0745,
            'address' => 'Pilar Street, Downtown Zamboanga City',
            'phone' => '+63 62 992 5566',
            'cuisine' => 'Iconic Zamboanga Halal Satti & Barbecue',
            'price_range' => '$',
            'operating_hours' => '06:00 AM - 08:00 PM',
            'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
            'description' => 'Legendary Muslim-owned satti house in downtown Zamboanga. Serving morning rice cubes (ta’mu) drenched in signature sweet-and-spicy thick red satti sauce with grilled halal beef and chicken skewers.',
            'popular_items' => ['Spicy Halal Beef Satti', 'Chicken Skewers with Ta’mu', 'Sweet-Spicy Satti Broth Bowl'],
            'rating' => 4.80,
            'review_count' => 380,
            'is_verified' => true,
        ]);
        $jimmys->amenities()->attach([
            $amenities['muslim_owned']->id,
            $amenities['halal_meat']->id,
            $amenities['alcohol_free']->id,
        ]);
        HalalCertificate::create([
            'poi_id' => $jimmys->id,
            'cert_body' => 'Muslim-Owned & Operated Enterprise',
            'cert_number' => 'MO-ZAM-SATTI-01',
            'status' => 'approved',
            'valid_until' => '2027-12-31',
        ]);

        // 7. Canelar Barter Trade Center
        $canelar = Poi::create([
            'custom_id' => 'poi-canelar',
            'name' => 'Canelar Barter Trade Center & Halal Market',
            'slug' => 'canelar-barter-trade-center',
            'category' => 'market',
            'tier' => 'tier2',
            'latitude' => 6.9185,
            'longitude' => 122.0715,
            'address' => 'Mayor Jaldon St, Canelar, Zamboanga City',
            'phone' => '+63 62 993 7890',
            'cuisine' => 'Malaysian/Indonesian Halal Imports & Yakan Weaves',
            'price_range' => '$',
            'operating_hours' => '08:00 AM - 07:00 PM',
            'image_url' => 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
            'description' => 'Famous trade market in Canelar operated by Muslim merchants featuring imported Halal Malaysian treats, Indonesian Sambal, Medjool and Ajwa dates, authentic Yakan tapestries, and traditional brassware.',
            'popular_items' => ['Imported Malaysian White Coffee & Treats', 'Medina Ajwa Dates', 'Authentic Sambal Paste', 'Yakan Weaves'],
            'rating' => 4.80,
            'review_count' => 420,
            'is_verified' => true,
        ]);
        $canelar->amenities()->attach([
            $amenities['muslim_owned']->id,
            $amenities['market_musalla']->id,
            $amenities['card_payments']->id,
        ]);

        // 8. Fort Pilar & Cultural Museum
        $fortPilar = Poi::create([
            'custom_id' => 'poi-fort-pilar',
            'name' => 'National Museum – Fort Pilar & Cultural Heritage',
            'slug' => 'fort-pilar-national-museum',
            'category' => 'cultural',
            'tier' => 'tier1',
            'latitude' => 6.9030,
            'longitude' => 122.0815,
            'address' => 'Fort Pilar, Sta. Barbara, Zamboanga City',
            'phone' => '+63 62 996 7788',
            'cuisine' => 'Mindanao Islamic Arts & Maritime Ethnography',
            'price_range' => '$',
            'operating_hours' => '09:00 AM - 05:00 PM (Closed Mondays)',
            'image_url' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
            'description' => 'Historic 17th-century fortress on land in Sta. Barbara housing museum galleries dedicated to Mindanao Islamic arts, Sama-Bajau maritime culture, traditional vinta boats, and Yakan weaving traditions.',
            'popular_items' => ['Islamic Maritime Trade Gallery', 'Sama-Bajau Boat Exhibits', 'Yakan Textile Gallery'],
            'rating' => 4.90,
            'review_count' => 480,
            'is_verified' => true,
        ]);
        $fortPilar->amenities()->attach([
            $amenities['prayer_room']->id,
            $amenities['wudu_area']->id,
            $amenities['guided_tours']->id,
            $amenities['family_friendly']->id,
        ]);

        // 9. Community Mosques in Sta. Barbara, Rio Hondo, Campo Muslim, Kasanyangan, Mampang, Arena Blanco
        $otherMosques = [
            [
                'custom_id' => 'poi-sta-barbara',
                'name' => 'Masjid Sta. Barbara (Central District Mosque)',
                'slug' => 'masjid-sta-barbara',
                'latitude' => 6.9110,
                'longitude' => 122.0805,
                'address' => 'N. Valderrosa St, Barangay Sta. Barbara, Zamboanga City',
                'phone' => '+63 62 991 3322',
                'cuisine' => 'Historic Central District Mosque',
                'rating' => 4.80,
                'review_count' => 420,
            ],
            [
                'custom_id' => 'poi-rio-hondo',
                'name' => 'Masjid Rio Hondo (Riverbank Mosque)',
                'slug' => 'masjid-rio-hondo',
                'latitude' => 6.9060,
                'longitude' => 122.0830,
                'address' => 'Rio Hondo Main Road (near River Bridge), Zamboanga City',
                'phone' => '+63 62 991 8877',
                'cuisine' => 'Rio Hondo Community Mosque on Land',
                'rating' => 4.70,
                'review_count' => 230,
            ],
            [
                'custom_id' => 'poi-campo-muslim',
                'name' => 'Masjid Campo Muslim',
                'slug' => 'masjid-campo-muslim',
                'latitude' => 6.9080,
                'longitude' => 122.0640,
                'address' => 'Campo Muslim Main Street, Zamboanga City',
                'phone' => '+63 62 991 4455',
                'cuisine' => 'Large Community District Mosque',
                'rating' => 4.80,
                'review_count' => 340,
            ],
            [
                'custom_id' => 'poi-kasanyangan-mosque',
                'name' => 'Masjid Kasanyangan',
                'slug' => 'masjid-kasanyangan',
                'latitude' => 6.9180,
                'longitude' => 122.0890,
                'address' => 'Barangay Kasanyangan, Zamboanga City',
                'phone' => '+63 62 992 6677',
                'cuisine' => 'Eastern Suburb Community Mosque',
                'rating' => 4.70,
                'review_count' => 190,
            ],
            [
                'custom_id' => 'poi-mampang-mosque',
                'name' => 'Masjid Mampang',
                'slug' => 'masjid-mampang',
                'latitude' => 6.9280,
                'longitude' => 122.1240,
                'address' => 'Mampang Coastal Road, Barangay Mampang, Zamboanga City',
                'phone' => '+63 62 993 1188',
                'cuisine' => 'Coastal District Mosque',
                'rating' => 4.80,
                'review_count' => 260,
            ],
            [
                'custom_id' => 'poi-arena-blanco-mosque',
                'name' => 'Masjid Arena Blanco',
                'slug' => 'masjid-arena-blanco',
                'latitude' => 6.8920,
                'longitude' => 122.1450,
                'address' => 'Barangay Arena Blanco, Zamboanga City',
                'phone' => '+63 62 994 2299',
                'cuisine' => 'South-Eastern Coastal Mosque',
                'rating' => 4.70,
                'review_count' => 210,
            ],
        ];

        foreach ($otherMosques as $m) {
            $created = Poi::create([
                'custom_id' => $m['custom_id'],
                'name' => $m['name'],
                'slug' => $m['slug'],
                'category' => 'worship',
                'tier' => 'tier1',
                'latitude' => $m['latitude'],
                'longitude' => $m['longitude'],
                'address' => $m['address'],
                'phone' => $m['phone'],
                'cuisine' => $m['cuisine'],
                'price_range' => 'Free',
                'operating_hours' => 'Open 24 Hours',
                'image_url' => 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
                'description' => "Community mosque in {$m['address']} providing daily prayers, wudu ablution stations, and Friday congregational Khutbah.",
                'rating' => $m['rating'],
                'review_count' => $m['review_count'],
                'is_verified' => true,
            ]);
            $created->amenities()->attach([
                $amenities['wudu_area']->id,
                $amenities['female_section']->id,
                $amenities['qibla_aligned']->id,
            ]);
        }
    }
}
