# 🕌 Hermosa-Tourism: Halal Tourism & Mosque Navigation System (Zamboanga City)

Comprehensive full-stack tourism management and navigation platform for **Zamboanga City (Ciudad Hermosa), Philippines**.

---

## 📁 Repository Structure

```
Hermosa-Tourism-System/
├── backend/                  # ⚡ Laravel 11 REST API & Spatial GIS Backend
│   ├── app/
│   │   ├── Http/Controllers/Api/V1/   # Poi, Review, Prayer API Controllers
│   │   ├── Http/Resources/V1/         # JSON API Resources
│   │   └── Models/                    # Poi, HalalCertificate, Amenity, Review
│   ├── database/
│   │   ├── migrations/                # Schema definitions
│   │   └── seeders/                   # Zamboanga City Authentic POI Seeder
│   └── routes/api.php                 # Versioned /api/v1 endpoints
│
└── frontend/
    ├── Mobile/               # 📱 Expo / React Native Mobile Application
    │   ├── src/
    │   │   ├── components/            # Map, Collapsible Prayer Capsule, Bottom Sheet
    │   │   ├── screens/               # Map, PlaceDetail, QiblaCompass
    │   │   ├── services/              # API Client & Mapbox Directions Routing
    │   │   └── utils/                 # Qibla azimuth & Haversine distance engine
    │   └── app.config.js              # Native Mapbox GL configuration
    │
    └── Web/                  # 💻 Vite + React + Tailwind CSS Web Admin Portal
        ├── src/
        │   ├── components/            # Sidebar, Navbar, Leaflet Map Pinpoint Picker
        │   ├── pages/                 # Dashboard, POIManager, CertificateAudits, Reviews, RegistryExport
        │   └── services/              # Laravel API client
        └── package.json
```

---

## 🚀 Quick Start Guide

### 1. ⚡ Backend (Laravel 11 REST API)
```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000
```

### 2. 💻 Web Admin Portal (Vite + React + Tailwind CSS)
```bash
cd frontend/Web
npm install
npm run dev
```
*Access the Web Admin Dashboard at `http://localhost:5173`.*

### 3. 📱 Mobile Application (Expo / React Native)
```bash
cd frontend/Mobile
npx expo start --dev-client
```
