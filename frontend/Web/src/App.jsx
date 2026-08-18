import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardOverview from './pages/DashboardOverview';
import POIManager from './pages/POIManager';
import CertificateAudits from './pages/CertificateAudits';
import MosqueFacilities from './pages/MosqueFacilities';
import ReviewModeration from './pages/ReviewModeration';
import RegistryExport from './pages/RegistryExport';
import POIModal from './components/POIModal';
import { fetchPOIs } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [pois, setPois] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPOI, setEditingPOI] = useState(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPOIs();
      setPois(data);
    }
    loadData();
  }, []);

  const handleTabChange = (tabId) => {
    setSearchTerm('');
    setActiveTab(tabId);
  };

  const handleAddNewPOI = () => {
    setEditingPOI(null);
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

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dynamic Contextual Top Navbar */}
        <Navbar
          activeTab={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNewPOI={handleAddNewPOI}
          poiCount={pois.length}
          onExportJSON={handleExportJSON}
          onPrintReport={handlePrintReport}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              pois={pois}
              onAddNewPOI={handleAddNewPOI}
              onSelectTab={handleTabChange}
            />
          )}

          {activeTab === 'pois' && (
            <POIManager
              pois={pois}
              searchFilter={searchTerm}
              onAddNewPOI={handleAddNewPOI}
              onEditPOI={handleEditPOI}
              onDeletePOI={handleDeletePOI}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificateAudits pois={pois} searchFilter={searchTerm} />
          )}

          {activeTab === 'mosques' && (
            <MosqueFacilities pois={pois} searchFilter={searchTerm} />
          )}

          {activeTab === 'reviews' && (
            <ReviewModeration pois={pois} searchFilter={searchTerm} />
          )}

          {activeTab === 'reports' && (
            <RegistryExport
              pois={pois}
              searchFilter={searchTerm}
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
      />
    </div>
  );
}
