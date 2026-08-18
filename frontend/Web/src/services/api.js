const API_BASE = 'http://localhost:8000/api/v1';

export async function fetchPOIs(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/pois?${query}`);
    if (res.ok) {
      const data = await res.json();
      return data.data || [];
    }
  } catch (err) {
    console.warn('Backend API connection failed, using fallback Zamboanga dataset', err);
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
  return null;
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
      description: 'The largest and most majestic Grand Mosque in Zamboanga City, located in Barangay Mercedes.',
      status: 'approved',
      expiryDate: '2030-12-31',
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
      address: 'Normal Road / Baliwasan Chico, Zamboanga City',
      latitude: 6.9142,
      longitude: 122.0590,
      hours: 'Open Daily (All 5 Prayers)',
      phone: '+63 62 991 7711',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Convenient community mosque located right beside the WMSU Main Campus in Baliwasan.',
      status: 'approved',
      expiryDate: '2028-12-31',
    },
    {
      id: 'poi-bay-tal-mal',
      name: 'Bay Tal Mal Authentic Halal Restaurant',
      category: 'dining',
      tier: 'tier1',
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
      description: 'The premier Halal dining restaurant in Zamboanga City for authentic Tausug royalty cuisine.',
      status: 'approved',
      expiryDate: '2026-12-31',
    },
    {
      id: 'poi-jimmys-satti',
      name: 'Jimmy’s Satti & Halal Eatery',
      category: 'dining',
      tier: 'tier2',
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
      description: 'Legendary Muslim-owned satti house in downtown Zamboanga.',
      status: 'approved',
      expiryDate: '2027-12-31',
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
      image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=800&q=80',
      description: 'Built in 1885 by Hadji Abdullah Maas Nuno, Taluksangay Mosque is the oldest historical mosque in Zamboanga.',
      status: 'approved',
      expiryDate: '2035-12-31',
    },
    {
      id: 'poi-canelar',
      name: 'Canelar Barter Trade Center & Halal Market',
      category: 'market',
      tier: 'tier2',
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
      description: 'Famous trade market in Canelar operated by Muslim merchants.',
      status: 'approved',
      expiryDate: '2026-11-30',
    },
  ];
}
