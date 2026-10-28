import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardOverview from './pages/DashboardOverview';
import POIManager from './pages/POIManager';
import MsmeApplications from './pages/MsmeApplications';
import PackageManager from './pages/PackageManager';
import CertificateAudits from './pages/CertificateAudits';
import MosqueFacilities from './pages/MosqueFacilities';
import ReviewModeration from './pages/ReviewModeration';
import RegistryExport from './pages/RegistryExport';
import POIModal from './components/POIModal';
import PublicMsmeModal from './components/PublicMsmeModal';
import SettingsModal from './components/SettingsModal';
import AdminLogin from './components/AdminLogin';
import CommandPaletteModal from './components/CommandPaletteModal';
import LandingPage from './pages/LandingPage';
import {
  fetchPOIs,
  fetchMsmeApplications,
  updateMsmeStatus,
  submitPublicMsmeApplication,
  fetchPackages,
  updatePackage,
  fetchPackageBookings,
  fetchTourGuides,
  updatePackageBookingStatus,
} from './services/api';

export default function App({ initialViewMode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pois, setPois] = useState([]);
  const [msmeApps, setMsmeApps] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guides, setGuides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublicMsmeOpen, setIsPublicMsmeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [editingPOI, setEditingPOI] = useState(null);
  const [modalCategory, setModalCategory] = useState('worship');
  const [poiViewMode, setPoiViewMode] = useState('list'); // 'list' | 'map'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [approveReviewsTrigger, setApproveReviewsTrigger] = useState(0);

  // View Mode: Defaults to 'public' (Landing Page) whenever localhost is opened or logged out
  const [viewMode, setViewMode] = useState(() => {
    if (initialViewMode) return initialViewMode;
    try {
      if (typeof window !== 'undefined' && window.location.hash === '#admin') {
        return 'admin';
      }
      const savedAuth = localStorage.getItem('hermosa_admin_auth');
      const savedView = localStorage.getItem('hermosa_admin_view');
      if (savedAuth === 'true' && savedView === 'admin') {
        return 'admin';
      }
      return 'public';
    } catch {
      return 'public';
    }
  });

  // Theme State (Option 1: Sulu Jade & Marine)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('hermosa_admin_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('hermosa_admin_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Admin Authentication & Session State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('hermosa_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('hermosa_admin_user');
      return stored
        ? JSON.parse(stored)
        : {
            name: 'Engr. Nur-Hassan Ahmad',
            email: 'admin@hermosa-tourism.ph',
            role: 'Chief Tourism Operations Officer',
            department: 'City Tourism & Islamic Affairs Office',
          };
    } catch {
      return {
        name: 'Engr. Nur-Hassan Ahmad',
        email: 'admin@hermosa-tourism.ph',
        role: 'Chief Tourism Operations Officer',
        department: 'City Tourism & Islamic Affairs Office',
      };
    }
  });

  // Administrative & System Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('hermosa_admin_settings');
      return stored
        ? JSON.parse(stored)
        : {
            agencyName: 'City Tourism & Islamic Affairs Office',
            lguUnit: 'City Government of Zamboanga',
            officerInCharge: 'Engr. Nur-Hassan Ahmad',
            officerTitle: 'Chief Tourism Operations Officer',
            officialContactEmail: 'tourism@zamboangacity.gov.ph',
            hotlineEmergency: '+63 62 991 2656',
            defaultHalalTierFilter: 'all',
            certExpirationWarningDays: 30,
            autoApproveVerifiedReviews: false,
            mandatoryWaterInspection: true,
            defaultCurrencyDisplay: 'PHP',
            prayerCalculationMethod: 'MWL',
            autoSyncIntervalMinutes: 5,
          };
    } catch {
      return {
        agencyName: 'City Tourism & Islamic Affairs Office',
        lguUnit: 'City Government of Zamboanga',
        officerInCharge: 'Engr. Nur-Hassan Ahmad',
        officerTitle: 'Chief Tourism Operations Officer',
        officialContactEmail: 'tourism@zamboangacity.gov.ph',
        hotlineEmergency: '+63 62 991 2656',
        defaultHalalTierFilter: 'all',
        certExpirationWarningDays: 30,
        autoApproveVerifiedReviews: false,
        mandatoryWaterInspection: true,
        defaultCurrencyDisplay: 'PHP',
        prayerCalculationMethod: 'MWL',
        autoSyncIntervalMinutes: 5,
      };
    }
  });

  const handleLogin = (user) => {
    setAdminUser(user);
    setIsAuthenticated(true);
    setViewMode('admin');
    setIsLoginModalOpen(false);
    try {
      localStorage.setItem('hermosa_admin_auth', 'true');
      localStorage.setItem('hermosa_admin_view', 'admin');
      localStorage.setItem('hermosa_admin_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    const confirmed =
      typeof window !== 'undefined' && window.confirm
        ? window.confirm(
            'Are you sure you want to sign out of the Zamboanga City Tourism Command Center?'
          )
        : true;

    if (confirmed) {
      setIsAuthenticated(false);
      setViewMode('public');
      setIsLoginModalOpen(false);
      try {
        localStorage.setItem('hermosa_admin_auth', 'false');
        localStorage.setItem('hermosa_admin_view', 'public');
      } catch {}
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('hermosa_admin_settings', JSON.stringify(newSettings));
    } catch {}
    if (newSettings.officerInCharge) {
      setAdminUser((prev) => ({
        ...prev,
        name: newSettings.officerInCharge,
        role: newSettings.officerTitle || prev.role,
        email: newSettings.officialContactEmail || prev.email,
        department: newSettings.agencyName || prev.department,
      }));
    }
  };

  useEffect(() => {
    async function loadData() {
      const [
        poisData,
        appsData,
        packagesData,
        bookingsData,
        guidesData,
      ] = await Promise.all([
        fetchPOIs(),
        fetchMsmeApplications(),
        fetchPackages(),
        fetchPackageBookings(),
        fetchTourGuides(),
      ]);
      setPois(poisData);
      setMsmeApps(appsData);
      setPackages(packagesData);
      setBookings(bookingsData);
      setGuides(guidesData);
    }
    loadData();
  }, []);

  // Global shortcut to open Command Palette with Cmd+K or Ctrl+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  const handleAddNewPOI = (category = 'worship') => {
    setEditingPOI(null);
    setModalCategory(typeof category === 'string' ? category : 'worship');
    setIsModalOpen(true);
  };

  const handleEditPOI = (poi) => {
    setEditingPOI(poi);
    setIsModalOpen(true);
  };

  const handleDeletePOI = (id) => {
    if (confirm('Are you sure you want to remove this place from the registry?')) {
      setPois((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSavePOI = (poiData) => {
    if (editingPOI) {
      setPois((prev) =>
        prev.map((p) => (p.id === editingPOI.id ? { ...p, ...poiData } : p))
      );
    } else {
      const newPlace = {
        ...poiData,
        id: `poi-${Date.now()}`,
        rating: 5.0,
        reviewCount: 1,
      };
      setPois((prev) => [newPlace, ...prev]);
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(pois, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'zamboanga_city_halal_registry_2026.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleUpdateMsmeStatus = async (id, status, notes = '') => {
    await updateMsmeStatus(id, status, notes);
    setMsmeApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status, admin_notes: notes } : app))
    );

    if (status === 'approved') {
      const app = msmeApps.find((a) => a.id === id);
      if (app) {
        const newPoi = {
          id: `poi-msme-${Date.now()}`,
          name: app.business_name,
          category: 'dining',
          tier: app.target_tier,
          province: app.province,
          region: app.region,
          cuisine: app.cuisine_specialty || 'Authentic Muslim-Friendly Dining',
          address: app.address,
          latitude: app.latitude || 6.7060,
          longitude: app.longitude || 121.9750,
          rating: 5.0,
          reviewCount: 0,
          status: 'approved',
          certBody: 'Community Halal Self-Declaration (Verified)',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        };
        setPois((prev) => [newPoi, ...prev]);
      }
    }
  };

  const handlePublicMsmeSubmit = async (formData) => {
    await submitPublicMsmeApplication(formData);
    const newApp = {
      ...formData,
      id: Date.now(),
      application_number: `MSME-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setMsmeApps((prev) => [newApp, ...prev]);
  };

  const handleUpdateBookingStatus = async (bookingId, status, assignedGuideId, adminNotes) => {
    await updatePackageBookingStatus(bookingId, status, assignedGuideId, adminNotes);
    const assignedGuide = guides.find((g) => g.id === assignedGuideId);
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              status,
              assigned_guide_id: assignedGuideId,
              assigned_guide: assignedGuide || b.assigned_guide,
              admin_notes: adminNotes,
            }
          : b
      )
    );
  };

  const handleUpdatePackage = async (packageId, packageData) => {
    const updated = await updatePackage(packageId, packageData);
    setPackages((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId || pkg.package_code === packageId) {
          return updated ? { ...pkg, ...updated } : { ...pkg, ...packageData };
        }
        return pkg;
      })
    );
    return updated;
  };

  const isEdgeToEdgeMap = activeTab === 'pois' && poiViewMode === 'map';

  const dynamicCounts = {
    pois: pois.length,
    pendingMsme: msmeApps.filter((a) => a.status === 'pending').length,
    bookings: bookings.length > 0 ? bookings.length : 3,
    mosques: pois.filter((p) => p.category === 'worship').length,
    reviews: '4',
  };

  if (viewMode === 'public') {
    return (
      <div className={`m-0 p-0 ${theme === 'dark' ? 'dark' : ''}`} style={{ margin: 0, padding: 0 }}>
        <LandingPage
          pois={pois}
          packages={packages}
          onOpenAdmin={() => {
            if (isAuthenticated) {
              setViewMode('admin');
              try {
                localStorage.setItem('hermosa_admin_view', 'admin');
              } catch {}
            } else {
              setIsLoginModalOpen(true);
            }
          }}
          onOpenMsme={() => setIsPublicMsmeOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          isAuthenticated={isAuthenticated}
        />

        {/* Public MSME Self-Declaration Intake Modal */}
        <PublicMsmeModal
          isOpen={isPublicMsmeOpen}
          onClose={() => setIsPublicMsmeOpen(false)}
          onSubmitSuccess={handlePublicMsmeSubmit}
        />

        {/* Officer Login Modal / Screen */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <AdminLogin
              onLogin={(user) => {
                handleLogin(user);
                setIsLoginModalOpen(false);
              }}
              onOpenPublicMsme={() => {
                setIsLoginModalOpen(false);
                setIsPublicMsmeOpen(true);
              }}
              onViewLandingPage={() => {
                setIsLoginModalOpen(false);
                setViewMode('public');
              }}
              onClose={() => setIsLoginModalOpen(false)}
            />
          </div>
        )}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AdminLogin
          onLogin={handleLogin}
          onOpenPublicMsme={() => setIsPublicMsmeOpen(true)}
          onViewLandingPage={() => {
            setViewMode('public');
            try {
              localStorage.setItem('hermosa_admin_view', 'public');
            } catch {}
          }}
          onClose={() => setViewMode('public')}
        />

        {/* Public MSME Self-Declaration Intake Modal */}
        <PublicMsmeModal
          isOpen={isPublicMsmeOpen}
          onClose={() => setIsPublicMsmeOpen(false)}
          onSubmitSuccess={handlePublicMsmeSubmit}
        />
      </>
    );
  }

  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans antialiased transition-colors duration-200 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        counts={dynamicCounts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        adminUser={adminUser}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dynamic Contextual Top Navbar */}
        <Navbar
          activeTab={activeTab}
          onAddNewPOI={handleAddNewPOI}
          poiCount={pois.length}
          onExportJSON={handleExportJSON}
          onPrintReport={handlePrintReport}
          poiViewMode={poiViewMode}
          setPoiViewMode={setPoiViewMode}
          onOpenPublicMsme={() => setIsPublicMsmeOpen(true)}
          onApproveAllReviews={() => setApproveReviewsTrigger((prev) => prev + 1)}
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          adminUser={adminUser}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onLogout={handleLogout}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onViewLandingPage={() => {
            setViewMode('public');
            try {
              localStorage.setItem('hermosa_admin_view', 'public');
            } catch {}
          }}
        />

        {/* Dynamic Page Content: Edge-to-Edge for MapView, Padded for List/Other Views */}
        <main
          className={`flex-1 overflow-hidden relative ${
            isEdgeToEdgeMap ? 'p-0' : 'overflow-y-auto p-4 sm:p-6 space-y-6'
          }`}
        >
          {activeTab === 'dashboard' && (
            <DashboardOverview
              pois={pois}
              onAddNewPOI={() => handleAddNewPOI('worship')}
              onSelectTab={handleTabChange}
            />
          )}

          {activeTab === 'pois' && (
            <POIManager
              pois={pois}
              viewMode={poiViewMode}
              onAddNewPOI={handleAddNewPOI}
              onEditPOI={handleEditPOI}
              onDeletePOI={handleDeletePOI}
            />
          )}

          {activeTab === 'msme' && (
            <MsmeApplications
              applications={msmeApps}
              onUpdateStatus={handleUpdateMsmeStatus}
              onOpenPublicForm={() => setIsPublicMsmeOpen(true)}
            />
          )}

          {activeTab === 'packages' && (
            <PackageManager
              packages={packages}
              bookings={bookings}
              guides={guides}
              onUpdateBookingStatus={handleUpdateBookingStatus}
              onUpdatePackage={handleUpdatePackage}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificateAudits pois={pois} />
          )}

          {activeTab === 'mosques' && (
            <MosqueFacilities pois={pois} />
          )}

          {activeTab === 'reviews' && (
            <ReviewModeration pois={pois} onApproveTrigger={approveReviewsTrigger} />
          )}

          {activeTab === 'reports' && (
            <RegistryExport
              pois={pois}
              onExportJSON={handleExportJSON}
              onPrint={handlePrintReport}
            />
          )}
        </main>
      </div>

      {/* Place / Mosque Add & Edit Modal */}
      <POIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePOI}
        initialData={editingPOI}
        defaultCategory={modalCategory}
      />

      {/* Public MSME Self-Declaration Intake Modal */}
      <PublicMsmeModal
        isOpen={isPublicMsmeOpen}
        onClose={() => setIsPublicMsmeOpen(false)}
        onSubmitSuccess={handlePublicMsmeSubmit}
      />

      {/* System & Agency Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      {/* Global Command Palette (Cmd + K) Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleTabChange}
        pois={pois}
        msmeApps={msmeApps}
        bookings={bookings}
      />
    </div>
  );
}
