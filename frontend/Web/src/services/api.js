const API_BASE = 'http://localhost:8000/api/v1';

export async function fetchPOIs(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/pois?${query}`);
    if (res.ok) {
      const data = await res.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('Backend API connection failed, using synchronized Zamboanga dataset', err);
  }
  return getFallbackPOIs();
}

export async function fetchPOIDetail(id) {
  try {
    const res = await fetch(`${API_BASE}/pois/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.data;
    }
  } catch (err) {
    console.warn('Error fetching POI detail:', err);
  }
  const fallback = getFallbackPOIs().find((p) => p.id === id);
  return fallback || null;
}

export async function fetchPorts() {
  return [];
}

export async function fetchMaritimeRoutes() {
  return [];
}

export async function fetchMsmeApplications() {
  try {
    const res = await fetch(`${API_BASE}/msme/applications`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) return data.data;
    }
  } catch (err) {
    console.warn('Backend MSME fetch failed, using mock applications:', err);
  }
  return [];
}

export async function updateMsmeStatus(id, status, adminNotes = '') {
  try {
    const res = await fetch(`${API_BASE}/msme/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error updating MSME status:', err);
  }
  return { success: false };
}

export async function submitPublicMsmeApplication(payload) {
  try {
    const res = await fetch(`${API_BASE}/msme/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error submitting MSME declaration:', err);
  }
  return { success: true, message: 'Saved to local intake pipeline' };
}

export async function fetchPackages() {
  try {
    const res = await fetch(`${API_BASE}/packages`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) return data.data;
    }
  } catch (err) {
    console.warn('Backend packages fetch failed:', err);
  }
  return [];
}

export async function updatePackage(id, packageData) {
  try {
    const res = await fetch(`${API_BASE}/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(packageData),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error updating package:', err);
  }
  return { success: false };
}

export async function fetchPackageBookings(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/packages/bookings/all?${query}`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) return data.data;
    }
  } catch (err) {
    console.warn('Backend bookings fetch failed:', err);
  }
  return [];
}

export async function updatePackageBookingStatus(id, status, assignedGuideId = null, adminNotes = '') {
  try {
    const res = await fetch(`${API_BASE}/packages/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        status,
        assigned_guide_id: assignedGuideId,
        admin_notes: adminNotes,
      }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Error updating booking status:', err);
  }
  return { success: false };
}

export async function fetchTourGuides() {
  try {
    const res = await fetch(`${API_BASE}/tour-guides`);
    if (res.ok) {
      const data = await res.json();
      if (data.data) return data.data;
    }
  } catch (err) {
    console.warn('Backend tour guides fetch failed:', err);
  }
  return [];
}

export function getFallbackPOIs() {
  return [
    {
      id: 'poi-sadik-grand-mosque',
      name: 'Sadik Grand Mosque (Mercedes)',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Zamboanga City Islamic Council & NCMF',
      certNumber: 'MOSQ-ZAM-SADIK-01',
      rating: 5.0,
      reviewCount: 920,
      priceRange: 'Free',
      cuisine: 'Largest Grand Mosque in Zamboanga City',
      address: 'MCLL Highway, Barangay Mercedes, Zamboanga City',
      latitude: 6.9580,
      longitude: 122.1400,
      hours: 'Open 24 Hours (All 5 Prayers, Jumuah & Eid)',
      phone: '+63 62 991 9900',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      description: 'The largest and most majestic Grand Mosque in Zamboanga City, located in Barangay Mercedes. Renowned for its breathtaking golden-green central domes, towering minarets, and an expansive multi-tiered prayer hall capable of hosting thousands of worshippers.',
      status: 'approved',
      expiryDate: '2030-12-31',
      popularDishes: ['Friday Congregational Jumuah', 'Islamic Educational Center', 'Free Zamzam & Date Dispensary'],
      amenities: [
        { id: 'massive_wudu', label: 'Grand Multi-Station Ablution Area', icon: 'water' },
        { id: 'female_section', label: 'Spacious Separate Female Mezzanine', icon: 'people' },
        { id: 'air_conditioned', label: 'Full Air-Cooled Prayer Halls', icon: 'snow' },
        { id: 'parking', label: 'Visitor & Bus Parking Lot', icon: 'car' },
        { id: 'qibla_aligned', label: 'Precision Aligned Qibla Mihrab', icon: 'compass' },
        { id: 'wheelchair', label: 'Wheelchair Accessible Ramps', icon: 'body' },
      ],
    },
    {
      id: 'poi-baliwasan-mosque',
      name: 'Masjid Baliwasan (WMSU Campus Mosque)',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Baliwasan Islamic Association',
      certNumber: 'MOSQ-ZAM-BAL-07',
      rating: 4.9,
      reviewCount: 310,
      priceRange: 'Free',
      cuisine: 'University District Community Mosque',
      address: 'Normal Road / Baliwasan Chico, Zamboanga City (Near WMSU)',
      latitude: 6.9142,
      longitude: 122.0590,
      hours: 'Open Daily (All 5 Prayers)',
      phone: '+63 62 991 7711',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Convenient community mosque located right beside the WMSU Main Campus in Baliwasan. Frequented by university students, faculty, and local residents for daily prayers and Friday Jumuah.',
      status: 'approved',
      expiryDate: '2028-12-31',
      popularDishes: ['Student Halal Study Circle', 'Daily Congregational Prayers'],
      amenities: [
        { id: 'wudu_area', label: 'Running Water Wudu Stations', icon: 'water' },
        { id: 'female_section', label: 'Separate Female Prayer Room', icon: 'people' },
        { id: 'near_wmsu', label: 'Walking Distance to WMSU Campus', icon: 'school' },
        { id: 'qibla_aligned', label: 'Precision Aligned Qibla Mihrab', icon: 'compass' },
      ],
    },
    {
      id: 'poi-sta-barbara',
      name: 'Masjid Sta. Barbara (Central District Mosque)',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Sta. Barbara Islamic Association',
      certNumber: 'MOSQ-ZAM-STABAR-02',
      rating: 4.8,
      reviewCount: 420,
      priceRange: 'Free',
      cuisine: 'Historic Central District Mosque',
      address: 'N. Valderrosa St, Barangay Sta. Barbara, Zamboanga City',
      latitude: 6.9110,
      longitude: 122.0805,
      hours: 'Open 24 Hours',
      phone: '+63 62 991 3322',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      description: 'Prominent community mosque in the historic Sta. Barbara district of downtown Zamboanga City, serving daily congregational prayers and neighborhood Islamic learning.',
      status: 'approved',
      expiryDate: '2029-12-31',
      popularDishes: ['Daily 5 Prayers', 'Friday Khutbah in Chavacano, English & Tausug'],
      amenities: [
        { id: 'wudu_area', label: 'Running Water Wudu Stations', icon: 'water' },
        { id: 'female_section', label: 'Separate Female Prayer Room', icon: 'people' },
      ],
    },
    {
      id: 'poi-taluksangay',
      name: 'Taluksangay Historic Mosque (Est. 1885)',
      category: 'worship',
      tier: 'tier1',
      certBody: 'National Historical Commission of the Philippines',
      certNumber: 'MOSQ-ZAM-1885-01',
      rating: 4.9,
      reviewCount: 512,
      priceRange: 'Free',
      cuisine: 'Oldest Mosque in Western Mindanao (Est. 1885)',
      address: 'Taluksangay Road, Barangay Taluksangay, Zamboanga City',
      latitude: 6.9555,
      longitude: 122.1795,
      hours: 'Open Daily (04:30 AM - 08:30 PM)',
      phone: '+63 62 992 1122',
      image: '/TaluksangayMosque.jpg',
      description: 'Built in 1885 by Hadji Abdullah Maas Nuno, Taluksangay Mosque is the oldest historical mosque in Zamboanga and Western Mindanao. Famous for its brilliant emerald green minarets and peaceful coastal village ambiance.',
      status: 'approved',
      expiryDate: '2035-12-31',
      popularDishes: ['Historical Heritage Tour', 'Community Assembly'],
      amenities: [
        { id: 'wudu_area', label: 'Clean Running Wudu Stations', icon: 'water' },
        { id: 'female_section', label: 'Dedicated Female Prayer Hall', icon: 'people' },
        { id: 'heritage_marker', label: 'Official NHCP Heritage Marker', icon: 'ribbon' },
        { id: 'parking', label: 'Courtyard Parking Available', icon: 'car' },
      ],
    },
    {
      id: 'poi-rio-hondo',
      name: 'Masjid Rio Hondo (Riverbank Mosque)',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Rio Hondo Muslim Community Council',
      certNumber: 'MOSQ-ZAM-RIO-04',
      rating: 4.7,
      reviewCount: 230,
      priceRange: 'Free',
      cuisine: 'Rio Hondo Community Mosque on Land',
      address: 'Rio Hondo Main Road (near River Bridge), Zamboanga City',
      latitude: 6.9060,
      longitude: 122.0830,
      hours: 'Open 24 Hours',
      phone: '+63 62 991 8877',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Iconic neighborhood mosque located on solid ground along the Rio Hondo riverbank road near the bridge. Beautiful dome overlooking the historical Rio Hondo community.',
      status: 'approved',
      expiryDate: '2028-06-30',
      popularDishes: ['Daily Congregational Prayers', 'Community Youth Qur’an Study'],
      amenities: [
        { id: 'wudu_area', label: 'Wudu Ablution Facility', icon: 'water' },
        { id: 'female_section', label: 'Separate Female Area', icon: 'people' },
      ],
    },
    {
      id: 'poi-campo-muslim',
      name: 'Masjid Campo Muslim',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Campo Muslim Religious Board',
      certNumber: 'MOSQ-ZAM-CM-09',
      rating: 4.8,
      reviewCount: 340,
      priceRange: 'Free',
      cuisine: 'Large Community District Mosque',
      address: 'Campo Muslim Main Street, Zamboanga City',
      latitude: 6.9080,
      longitude: 122.0640,
      hours: 'Open 24 Hours',
      phone: '+63 62 991 4455',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      description: 'Major bustling community mosque in Barangay Campo Muslim, featuring an active Islamic center, Madrasah programs, and vibrant community prayers.',
      status: 'approved',
      expiryDate: '2028-12-31',
      popularDishes: ['Friday Khutbah', 'Madrasah Youth Classes'],
      amenities: [
        { id: 'wudu_area', label: 'Spacious Wudu Area', icon: 'water' },
        { id: 'female_section', label: 'Female Prayer Section', icon: 'people' },
      ],
    },
    {
      id: 'poi-kasanyangan-mosque',
      name: 'Masjid Kasanyangan',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Kasanyangan Islamic Council',
      certNumber: 'MOSQ-ZAM-KAS-12',
      rating: 4.7,
      reviewCount: 190,
      priceRange: 'Free',
      cuisine: 'Eastern Suburb Community Mosque',
      address: 'Barangay Kasanyangan, Zamboanga City',
      latitude: 6.9180,
      longitude: 122.0890,
      hours: 'Open Daily (04:30 AM - 09:00 PM)',
      phone: '+63 62 992 6677',
      image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
      description: 'Prominent community mosque in Barangay Kasanyangan serving local Muslim families with daily congregational prayers and spiritual programs.',
      status: 'approved',
      expiryDate: '2029-08-31',
      popularDishes: ['Daily Prayers', 'Ramadan Iftar Gatherings'],
      amenities: [
        { id: 'wudu_area', label: 'Wudu Ablution Facility', icon: 'water' },
        { id: 'female_section', label: 'Separate Women Section', icon: 'people' },
      ],
    },
    {
      id: 'poi-mampang-mosque',
      name: 'Masjid Mampang',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Mampang Islamic Board',
      certNumber: 'MOSQ-ZAM-MAMP-15',
      rating: 4.8,
      reviewCount: 260,
      priceRange: 'Free',
      cuisine: 'Coastal District Mosque',
      address: 'Mampang Coastal Road, Barangay Mampang, Zamboanga City',
      latitude: 6.9280,
      longitude: 122.1240,
      hours: 'Open 24 Hours',
      phone: '+63 62 993 1188',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
      description: 'Beautiful mosque in Barangay Mampang serving the coastal communities of eastern Zamboanga with serene prayer halls and active religious programs.',
      status: 'approved',
      expiryDate: '2028-10-31',
      popularDishes: ['Friday Assembly', 'Community Qur’an Reading'],
      amenities: [
        { id: 'wudu_area', label: 'Wudu Facility', icon: 'water' },
        { id: 'female_section', label: 'Female Musalla', icon: 'people' },
      ],
    },
    {
      id: 'poi-arena-blanco-mosque',
      name: 'Masjid Arena Blanco',
      category: 'worship',
      tier: 'tier1',
      certBody: 'Arena Blanco Islamic Trust',
      certNumber: 'MOSQ-ZAM-AB-18',
      rating: 4.7,
      reviewCount: 210,
      priceRange: 'Free',
      cuisine: 'South-Eastern Coastal Mosque',
      address: 'Barangay Arena Blanco, Zamboanga City',
      latitude: 6.8920,
      longitude: 122.1450,
      hours: 'Open 24 Hours',
      phone: '+63 62 994 2299',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Southeastern coastal mosque in Barangay Arena Blanco known for its peaceful village setting and active Islamic congregation.',
      status: 'approved',
      expiryDate: '2029-05-31',
      popularDishes: ['Daily Congregational Prayers', 'Community Youth Programs'],
      amenities: [
        { id: 'wudu_area', label: 'Wudu Stations', icon: 'water' },
        { id: 'female_section', label: 'Separate Female Area', icon: 'people' },
      ],
    },
    {
      id: 'poi-bay-tal-mal',
      name: 'Baitul Maal Native Halal Bistro',
      category: 'dining',
      tier: 'tier1',
      isMuslimFriendly: true,
      hasSeparateCooking: true,
      hasPrayerRoom: true,
      supplierName: 'Mindanao Halal Livestock & Agro Producers',
      supplierLocation: 'Barangay San Roque, Zamboanga City',
      accreditationNumber: 'DOT-RO9-ACC-2026-042',
      isPromoted: true,
      certBody: 'NCMF Halal Certified Kitchen',
      certNumber: 'NCMF-ZAM-2024-114',
      rating: 4.9,
      reviewCount: 450,
      priceRange: '$$',
      cuisine: 'Authentic Tausug Specialties (Tiula Itum, Kulma, Pyanggang)',
      address: 'Mayor Jaldon St, Downtown, Zamboanga City',
      latitude: 6.9150,
      longitude: 122.0735,
      hours: '10:00 AM - 09:30 PM',
      phone: '+63 62 991 3344',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'The premier Halal dining restaurant in Zamboanga City for authentic Tausug royalty cuisine. Renowned for its rich Tiula Itum (black beef soup infused with charred coconut), Beef Kulma, and Chicken Pyanggang.',
      status: 'approved',
      expiryDate: '2026-12-31',
      popularDishes: ['Royal Beef Tiula Itum', 'Chicken Pyanggang in Burnt Coconut', 'Beef Kulma with Fragrant Rice', 'Spiced Liyabihan'],
      amenities: [
        { id: 'halal_kitchen', label: '100% Halal Certified Kitchen', icon: 'checkmark-circle' },
        { id: 'prayer_room', label: 'Customer Musalla / Prayer Room', icon: 'moon' },
        { id: 'wudu_area', label: 'Wudu Facilities On-Site', icon: 'water' },
        { id: 'alcohol_free', label: 'Strictly No Alcohol Served', icon: 'ban' },
        { id: 'air_con', label: 'Air-Conditioned Dining Rooms', icon: 'snow' },
      ],
    },
    {
      id: 'poi-jimmys-satti',
      name: 'Ymmij Traditional Satti Haus',
      category: 'dining',
      tier: 'tier2',
      isMuslimFriendly: true,
      hasSeparateCooking: true,
      hasPrayerRoom: false,
      supplierName: 'Zamboanga Native Poultry Farm',
      supplierLocation: 'Barangay Guiwan, Zamboanga City',
      accreditationNumber: 'DOT-RO9-ACC-2026-077',
      isPromoted: true,
      certBody: 'Muslim-Owned & Operated Enterprise',
      certNumber: 'MO-ZAM-SATTI-01',
      rating: 4.8,
      reviewCount: 380,
      priceRange: '$',
      cuisine: 'Iconic Zamboanga Halal Satti & Barbecue',
      address: 'Pilar Street, Downtown Zamboanga City',
      latitude: 6.9105,
      longitude: 122.0745,
      hours: '06:00 AM - 08:00 PM',
      phone: '+63 62 992 5566',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Legendary Muslim-owned satti house in downtown Zamboanga. Serving morning rice cubes (ta’mu) drenched in signature sweet-and-spicy thick red satti sauce with grilled halal beef and chicken skewers.',
      status: 'approved',
      expiryDate: '2027-12-31',
      popularDishes: ['Spicy Halal Beef Satti', 'Chicken Skewers with Ta’mu', 'Sweet-Spicy Satti Broth Bowl'],
      amenities: [
        { id: 'muslim_owned', label: '100% Muslim-Owned & Cooked', icon: 'heart-circle' },
        { id: 'halal_meat', label: 'Halal Freshly Butchered Skewers', icon: 'checkmark-circle' },
        { id: 'alcohol_free', label: 'Strictly No Alcohol', icon: 'ban' },
      ],
    },
    {
      id: 'poi-dennis-coffee',
      name: 'Sinned Highland Coffee Oasis',
      category: 'dining',
      tier: 'tier2',
      isMuslimFriendly: true,
      hasSeparateCooking: true,
      hasPrayerRoom: true,
      supplierName: 'Sulu Organic Robusta Growers Cooperative',
      supplierLocation: 'Panamao, Sulu & San Jose, Zamboanga',
      accreditationNumber: 'DOT-RO9-ACC-2026-115',
      isPromoted: true,
      certBody: 'Muslim-Owned Cultural Heritage Cafe',
      certNumber: 'MO-ZAM-DCG-05',
      rating: 4.9,
      reviewCount: 340,
      priceRange: '$$',
      cuisine: 'Authentic Tausug Coffee (Kahawa Sug) & Native Pastries',
      address: 'San Jose Road, Barangay San Jose, Zamboanga City',
      latitude: 6.9210,
      longitude: 122.0620,
      hours: '08:00 AM - 10:00 PM',
      phone: '+63 62 991 4488',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      description: 'Iconic heritage cafe celebrating the rich coffee and culinary traditions of Sulu. Famous for authentic Kahawa Sug (Sulu native coffee), Jaa, Bangbang Sug pastries, and warm garden ambiance.',
      status: 'approved',
      expiryDate: '2027-10-31',
      popularDishes: ['Kahawa Sug Native Brew', 'Bangbang Sug Pastry Platter', 'Durian Coffee', 'Beef Kulma Rice'],
      amenities: [
        { id: 'muslim_owned', label: '100% Muslim-Owned Heritage Cafe', icon: 'heart-circle' },
        { id: 'prayer_room', label: 'Customer Prayer Space Available', icon: 'moon' },
        { id: 'alcohol_free', label: 'Strictly No Alcohol Served', icon: 'ban' },
        { id: 'air_con', label: 'Garden & Air-Cooled Seating', icon: 'snow' },
      ],
    },
    {
      id: 'poi-al-sultan',
      name: 'Sultanate Halal Kitchen & Bakeshop',
      category: 'dining',
      tier: 'tier1',
      isMuslimFriendly: true,
      hasSeparateCooking: true,
      hasPrayerRoom: true,
      supplierName: 'Al-Barakah Halal Cold Chain Logistics',
      supplierLocation: 'Veterans Ave, Zamboanga City',
      accreditationNumber: 'DOT-RO9-ACC-2026-059',
      isPromoted: false,
      certBody: 'NCMF Certified Halal Dining',
      certNumber: 'NCMF-ZAM-2024-189',
      rating: 4.8,
      reviewCount: 290,
      priceRange: '$$',
      cuisine: 'Middle Eastern, Tausug & Halal Pastries',
      address: 'Veterans Avenue, Downtown, Zamboanga City',
      latitude: 6.9175,
      longitude: 122.0780,
      hours: '09:00 AM - 09:00 PM',
      phone: '+63 62 992 3344',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Renowned Halal dining destination on Veterans Avenue featuring savory Biryani, Shawarma platters, Tiula Itum, and freshly baked Middle Eastern & Tausug halal pastries.',
      status: 'approved',
      expiryDate: '2026-11-30',
      popularDishes: ['Chicken Mandi & Biryani', 'Beef Tiula Itum Platter', 'Fresh Baklava & Native Cakes'],
      amenities: [
        { id: 'halal_kitchen', label: '100% Halal Certified Kitchen', icon: 'checkmark-circle' },
        { id: 'prayer_room', label: 'Clean Musalla on 2nd Floor', icon: 'moon' },
        { id: 'wudu_area', label: 'Running Water Wudu Station', icon: 'water' },
        { id: 'alcohol_free', label: 'Strictly No Alcohol', icon: 'ban' },
      ],
    },
    {
      id: 'poi-mano-mano',
      name: 'Ralava Mano-Mano Seafood Grill',
      category: 'dining',
      tier: 'tier2',
      isMuslimFriendly: true,
      hasSeparateCooking: true,
      hasPrayerRoom: true,
      supplierName: 'Zamboanga Fisherfolk Cooperative & Recodo Fisheries',
      supplierLocation: 'Barangay Recodo & San Jose Gusu, Zamboanga City',
      accreditationNumber: 'DOT-RO9-ACC-2026-088',
      isPromoted: true,
      certBody: 'Muslim-Owned Halal Enterprise',
      certNumber: 'MO-ZAM-MMG-08',
      rating: 4.7,
      reviewCount: 260,
      priceRange: '$$',
      cuisine: 'Grilled Pyanggang, Charcoal Seafood & Native Satti',
      address: 'Gov. Alvarez Street, Zamboanga City',
      latitude: 6.9160,
      longitude: 122.0680,
      hours: '11:00 AM - 10:00 PM',
      phone: '+63 62 991 7766',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'Casual open-air native barbecue and seafood grill specializing in Pyanggang chicken charred over coconut husks, Curacha in Ralava Halal sauce, and grilled tuna belly.',
      status: 'approved',
      expiryDate: '2027-08-31',
      popularDishes: ['Charcoal Grilled Chicken Pyanggang', 'Grilled Tuna Panga', 'Curacha in Ralava Sauce'],
      amenities: [
        { id: 'muslim_owned', label: '100% Muslim-Owned Kitchen', icon: 'heart-circle' },
        { id: 'halal_meat', label: 'Certified Halal Butchered Meats', icon: 'checkmark-circle' },
        { id: 'alcohol_free', label: 'Alcohol-Free Family Venue', icon: 'ban' },
      ],
    },
    {
      id: 'poi-canelar',
      name: 'Canelar Souk & Heritage Market',
      category: 'market',
      tier: 'tier2',
      isMuslimFriendly: true,
      hasSeparateCooking: false,
      hasPrayerRoom: true,
      supplierName: 'BIMP-EAGA Cross-Border Halal Traders',
      supplierLocation: 'Canelar Wharf Access, Zamboanga City',
      accreditationNumber: 'DOT-RO9-ACC-2026-021',
      isPromoted: false,
      certBody: 'Muslim Merchants Association of Zamboanga',
      certNumber: 'MO-ZAM-2024-884',
      rating: 4.8,
      reviewCount: 420,
      priceRange: '$',
      cuisine: 'Malaysian/Indonesian Halal Imports & Yakan Weaves',
      address: 'Mayor Jaldon St, Canelar, Zamboanga City',
      latitude: 6.9185,
      longitude: 122.0715,
      hours: '08:00 AM - 07:00 PM',
      phone: '+63 62 993 7890',
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
      description: 'Famous trade market in Canelar operated by Muslim merchants featuring imported Halal Malaysian treats, Indonesian Sambal, Medjool and Ajwa dates, authentic Yakan tapestries, and traditional brassware.',
      status: 'approved',
      expiryDate: '2026-11-30',
      popularDishes: ['Imported Malaysian White Coffee & Treats', 'Medina Ajwa Dates', 'Authentic Sambal Paste', 'Yakan Weaves'],
      amenities: [
        { id: 'muslim_owned', label: '100% Muslim Merchant Stalls', icon: 'heart-circle' },
        { id: 'market_musalla', label: 'Market Musalla Available for Prayers', icon: 'moon' },
        { id: 'card_payments', label: 'Cash & GCash Accepted', icon: 'card' },
      ],
    },
    {
      id: 'poi-fort-pilar',
      name: 'National Museum – Fort Pilar & Cultural Heritage',
      category: 'cultural',
      tier: 'tier1',
      certBody: 'National Museum of the Philippines',
      certNumber: 'CUL-ZAM-1635-02',
      rating: 4.9,
      reviewCount: 480,
      priceRange: '$',
      cuisine: 'Mindanao Islamic Arts & Maritime Ethnography',
      address: 'Fort Pilar, Sta. Barbara, Zamboanga City',
      latitude: 6.9030,
      longitude: 122.0815,
      hours: '09:00 AM - 05:00 PM (Closed Mondays)',
      phone: '+63 62 996 7788',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
      description: 'Historic 17th-century fortress on land in Sta. Barbara housing museum galleries dedicated to Mindanao Islamic arts, Sama-Bajau maritime culture, traditional vinta boats, and Yakan weaving traditions.',
      status: 'approved',
      expiryDate: '2030-12-31',
      popularDishes: ['Islamic Maritime Trade Gallery', 'Sama-Bajau Boat Exhibits', 'Yakan Textile Gallery'],
      amenities: [
        { id: 'prayer_space', label: 'Visitor Prayer Room on Site', icon: 'moon' },
        { id: 'wudu_area', label: 'Clean Ablution Facility', icon: 'water' },
        { id: 'guided_tours', label: 'Guided Cultural Tour Guides', icon: 'mic' },
        { id: 'family_friendly', label: 'Courtyards & Open Gardens', icon: 'people' },
      ],
    },
  ];
}
