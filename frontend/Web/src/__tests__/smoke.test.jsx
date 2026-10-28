import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';

// Mock API service
const mockPois = [
  {
    id: 'poi-baliwasan-mosque',
    name: 'Masjid Baliwasan (WMSU Campus Mosque)',
    category: 'worship',
    tier: 'tier1',
    address: 'Normal Road, Baliwasan Chico, Zamboanga City',
    latitude: 6.9142,
    longitude: 122.059,
    rating: 4.9,
    reviewCount: 310,
    cuisine: 'Campus Community Mosque',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
    certBody: 'Baliwasan Islamic Association',
    certNumber: 'MOSQ-ZAM-BAL-07',
    amenities: [
      { id: 'wudu_area', label: 'Running Water Wudu Stations' },
      { id: 'female_section', label: 'Dedicated Female Prayer Hall' },
    ],
  },
  {
    id: 'poi-bay-tal-mal',
    name: 'Baitul Maal Native Halal Bistro',
    category: 'dining',
    tier: 'tier1',
    address: 'Gov. Ramos Ave, Santa Maria, Zamboanga City',
    latitude: 6.9288,
    longitude: 122.0725,
    rating: 4.8,
    reviewCount: 420,
    cuisine: 'Traditional Tausug & Moro Feast',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    certBody: 'National Commission on Muslim Filipinos (NCMF)',
    certNumber: 'HALAL-NCMF-2026-088',
    amenities: [
      { id: 'halal_kitchen', label: '100% Halal Kitchen' },
      { id: 'prayer_room', label: 'Customer Musalla' },
    ],
  },
];

const mockPorts = [
  {
    id: 1,
    name: 'Zamboanga City Port Passenger Terminal',
    code: 'ZAM-PORT',
    province: 'Zamboanga City',
    address: 'Port Area, N.S. Valderrosa St, Zamboanga City',
    contactNumber: '+63 62 991 2037',
    coastGuardHotline: '+63 917 815 6900',
    hasPrayerRoom: true,
    hasWuduArea: true,
    guidelines: 'Primary sea transit gateway',
  },
];

const mockRoutes = [
  {
    id: 1,
    origin: 'Zamboanga City Port Terminal',
    destination: 'Isabela Port Terminal (Basilan)',
    operatorName: 'Aleson Shipping Lines',
    vesselType: 'High-Speed Fastcraft',
    estimatedDuration: '45 mins',
    fareEconomy: 220,
    fareBusiness: 350,
    schedules: ['06:30 AM', '10:00 AM'],
    hasPrayerArea: true,
    hasHalalFood: true,
    bookingPhone: '+63 62 991 2656',
    advisory: 'Fastcraft connection across Basilan Strait',
  },
];

const mockMsmeApps = [
  {
    id: 1,
    application_number: 'MSME-2026-001',
    business_name: 'Al-Mubarak Satti & Grill',
    owner_name: 'Ustadz Ibrahim Sali',
    contact_phone: '+63 917 112 3344',
    province: 'Basilan',
    city_municipality: 'Isabela City',
    address: 'Barangay Sunrise, Isabela City, Basilan',
    target_tier: 'tier2',
    cuisine_specialty: 'Tausug Satti',
    meat_supplier_name: 'Basilan Halal Meat Cooperative',
    strictly_no_pork_alcohol: true,
    has_prayer_corner: true,
    kitchen_practices_description: 'Strictly segregated Halal kitchen.',
    status: 'pending',
  },
];

const mockPackages = [
  {
    id: 'package_a',
    code: 'PACKAGE A',
    title: 'All-Inclusive Guided Heritage Expedition',
    price_php: 6500,
    price_unit: '/ person (all-inclusive)',
    duration: '3 Days / 2 Nights',
    inclusions: [{ icon: 'person', text: 'Accredited Bilingual Tour Guide' }],
  },
];

const mockBookings = [
  {
    id: 1,
    booking_reference: 'PKG-2026-TU1B',
    package_code: 'package_a',
    traveler_name: 'Ahmad bin Abdullah',
    traveler_email: 'ahmad.abdullah@gmail.com',
    traveler_phone: '+60 12 345 6789',
    nationality: 'Malaysia / BIMP-EAGA',
    pax_count: 2,
    travel_date: '2026-11-05',
    currency: 'PHP',
    total_amount: 13000,
    status: 'inquiry',
    assigned_guide_name: null,
    package: mockPackages[0],
  },
];

const mockGuides = [
  {
    id: 1,
    full_name: 'Ustadz Nur-Amin J. Abubakar',
    languages: ['Tausug', 'English', 'Arabic'],
    specialization: 'Islamic Architecture & History',
    is_active: true,
  },
];

describe('Hermosa-Tourism Web Admin Smoke Test Suite', () => {
  beforeEach(() => {
    localStorage.setItem('hermosa_admin_auth', 'true');
    localStorage.setItem('hermosa_admin_view', 'admin');
    vi.spyOn(api, 'fetchPOIs').mockResolvedValue(mockPois);
    vi.spyOn(api, 'fetchMsmeApplications').mockResolvedValue(mockMsmeApps);
    vi.spyOn(api, 'updateMsmeStatus').mockResolvedValue({ success: true });
    vi.spyOn(api, 'submitPublicMsmeApplication').mockResolvedValue({ success: true });
    vi.spyOn(api, 'fetchPackages').mockResolvedValue(mockPackages);
    vi.spyOn(api, 'fetchPackageBookings').mockResolvedValue(mockBookings);
    vi.spyOn(api, 'fetchTourGuides').mockResolvedValue(mockGuides);
    vi.spyOn(api, 'updatePackageBookingStatus').mockResolvedValue({ success: true });
  });

  it('1. Renders the Executive Overview dashboard and brand header', async () => {
    render(<App />);

    expect(screen.getByText('VintaGo')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getAllByText('Executive Overview').length).toBeGreaterThanOrEqual(1);

    await waitFor(() => {
      expect(screen.getByText(/Zamboanga City Tourism & Islamic Affairs Dashboard/i)).toBeInTheDocument();
    });
  });

  it('2. Navigates seamlessly through all 8 menu tabs', async () => {
    render(<App />);

    // Tab 2: Place & Mosque Directory
    fireEvent.click(screen.getByRole('button', { name: /Place & Mosque Directory/i }));
    expect(screen.getAllByText(/Place & Mosque Directory/i).length).toBeGreaterThanOrEqual(1);

    // Tab 3: Packages & Bookings
    fireEvent.click(screen.getByRole('button', { name: /Packages & Bookings/i }));
    expect(screen.getAllByText(/Packages & Bookings/i).length).toBeGreaterThanOrEqual(1);

    // Tab 4: MSME Halal Onboarding
    fireEvent.click(screen.getByRole('button', { name: /MSME Halal Onboarding/i }));
    expect(screen.getAllByText(/MSME Halal/i).length).toBeGreaterThanOrEqual(1);

    // Tab 5: Halal Certificate Audits
    fireEvent.click(screen.getByRole('button', { name: /Halal Certificate Audits/i }));
    expect(screen.getAllByText(/Halal Certificate Audits/i).length).toBeGreaterThanOrEqual(1);

    // Tab 6: Mosque & Facilities
    fireEvent.click(screen.getByRole('button', { name: /Mosque & Facilities/i }));
    expect(screen.getAllByText(/Mosque Facilities/i).length).toBeGreaterThanOrEqual(1);

    // Tab 7: Community Reviews
    fireEvent.click(screen.getByRole('button', { name: /Community Reviews/i }));
    expect(screen.getAllByText(/Community Review/i).length).toBeGreaterThanOrEqual(1);

    // Tab 8: Registry Export & Reports
    fireEvent.click(screen.getByRole('button', { name: /Registry Export & Reports/i }));
    expect(screen.getAllByText(/Official Registry/i).length).toBeGreaterThanOrEqual(1);
  });

  it('3. Can open the Public MSME Form from the top navbar button', async () => {
    render(<App />);

    // Go to MSME tab
    fireEvent.click(screen.getByRole('button', { name: /MSME Halal Onboarding/i }));

    // Click "+ Open Public Form" in top navbar
    const openFormButtons = screen.getAllByRole('button', { name: /\+ Open Public Form/i });
    expect(openFormButtons.length).toBeGreaterThan(0);
    fireEvent.click(openFormButtons[0]);

    // Modal should now be open
    expect(screen.getByText('MSME Halal Self-Declaration Portal')).toBeInTheDocument();
    expect(screen.getByText(/Affordable Halal Inclusivity/i)).toBeInTheDocument();

    // Close the modal
    const closeBtn = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText('MSME Halal Self-Declaration Portal')).not.toBeInTheDocument();
  });

  it('4. Allows filtering mosque amenities correctly in Mosque Facilities', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Mosque & Facilities/i }));

    await waitFor(() => {
      expect(screen.getByText('Masjid Baliwasan (WMSU Campus Mosque)')).toBeInTheDocument();
    });

    // Select "Running Wudu Stations"
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'wudu' } });
    expect(screen.getByText(/Running Wudu Stations/i)).toBeInTheDocument();
  });

  it('5. Allows approving reviews and batch approving all verified reviews', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Community Reviews/i }));

    // Click "Approve All Verified" button in navbar
    const approveAllBtn = screen.getByRole('button', { name: /Approve All Verified/i });
    fireEvent.click(approveAllBtn);

    await waitFor(() => {
      expect(screen.getByText(/All pending visitor reviews have been verified and approved/i)).toBeInTheDocument();
    });
  });

  it('6. Opens notification popover when clicking the bell in navbar', async () => {
    render(<App />);

    const bellBtn = screen.getByLabelText(/View system notifications/i);
    fireEvent.click(bellBtn);

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText(/Al-Mubarak Satti/i)).toBeInTheDocument();

    // Click mark all read
    const markReadBtn = screen.getByText('Mark all read');
    fireEvent.click(markReadBtn);
    expect(screen.queryByText('2 new')).not.toBeInTheDocument();
  });

  it('7. Renders the Packages & Bookings manager with queue and guide assignment', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Packages & Bookings/i }));

    await waitFor(() => {
      expect(screen.getByText(/Tour Packages & Guide Operations/i)).toBeInTheDocument();
      expect(screen.getByText('PKG-2026-TU1B')).toBeInTheDocument();
      expect(screen.getByText('Ahmad bin Abdullah')).toBeInTheDocument();
    });
  });

  it('8. Opens the System & Agency Settings modal from User Account menu', async () => {
    render(<App />);

    // Click the user account menu button in the navbar
    const userMenuBtn = screen.getByLabelText(/User account menu/i);
    fireEvent.click(userMenuBtn);

    // Click "System & Agency Settings"
    const settingsOption = screen.getByText(/System & Agency Settings/i);
    fireEvent.click(settingsOption);

    // Verify modal is open
    expect(screen.getByText('Agency Profile')).toBeInTheDocument();
    expect(screen.getByText('Halal & Audit Policies')).toBeInTheDocument();
    expect(screen.getByText('System & Localization')).toBeInTheDocument();

    // Close the settings modal
    const closeBtn = screen.getByLabelText(/Close settings modal/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Halal & Audit Policies')).not.toBeInTheDocument();
  });

  it('9. Logs out to the Visitor Landing Page and can open Officer Sign-In', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<App />);

    // Click user account menu in navbar
    const userMenuBtn = screen.getByLabelText(/User account menu/i);
    fireEvent.click(userMenuBtn);

    // Click "Sign Out of Command Center"
    const logoutBtn = screen.getByText(/Sign Out of Command Center/i);
    fireEvent.click(logoutBtn);

    // Verify user is redirected to the Visitor Landing Page first
    await waitFor(() => {
      expect(screen.getByText(/Where the Coral Sea Meets the Minarets/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Officer Sign In/i })).toBeInTheDocument();
    });

    // Click Officer Sign In
    const officerSignInBtn = screen.getByRole('button', { name: /Officer Sign In/i });
    fireEvent.click(officerSignInBtn);

    // Verify login modal appears
    await waitFor(() => {
      expect(screen.getByText(/Zamboanga City Tourism & Islamic Affairs/i)).toBeInTheDocument();
      expect(screen.getByText(/1-Click Demo Sign-In/i)).toBeInTheDocument();
    });

    // Click 1-Click Demo Sign-In
    const demoBtn = screen.getByRole('button', { name: /1-Click Demo Sign-In/i });
    fireEvent.click(demoBtn);

    // Verify user is logged back into dashboard
    await waitFor(() => {
      expect(screen.getAllByText('Executive Overview').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('10. Navigates seamlessly to the Visitor Landing Page and back to Command Center', async () => {
    render(<App />);

    // Click "Visitor Portal" button in the top navbar
    const visitorBtn = screen.getByRole('button', { name: /Visitor Portal/i });
    fireEvent.click(visitorBtn);

    // Verify Landing Page hero and sections are rendered
    expect(screen.getByText(/Where the Coral Sea Meets the Minarets/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Places & Mosques/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Popular Halal Food in Zamboanga/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Tour Packages & Guides/i).length).toBeGreaterThanOrEqual(1);

    // Click "Admin Dashboard" button on the landing page header to return
    const adminReturnBtn = screen.getByRole('button', { name: /Admin Dashboard/i });
    fireEvent.click(adminReturnBtn);

    // Verify user returns to the Executive Overview
    expect(screen.getAllByText('Executive Overview').length).toBeGreaterThanOrEqual(1);
  });

  it('11. Visitor opening localhost sees the Landing Page first by default', async () => {
    localStorage.clear();

    render(<App />);

    // Should immediately display the public Landing Page
    expect(screen.getByText(/Where the Coral Sea Meets the Minarets/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Officer Sign In/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Places & Mosques/i).length).toBeGreaterThanOrEqual(1);
  });
});
