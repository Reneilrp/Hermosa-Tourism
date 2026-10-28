#!/usr/bin/env node

/**
 * Hermosa-Tourism Full-Stack System Smoke Test
 * Tests Laravel 11 Backend REST API & Vite Web Admin Portal
 */

const API_BASE = 'http://localhost:8000/api/v1';
const WEB_BASE = 'http://localhost:5173';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

async function checkEndpoint(name, url, validateFn) {
  process.stdout.write(`  ▶ Testing ${name.padEnd(45)} `);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.log(`${colors.red}FAILED (HTTP ${res.status})${colors.reset}`);
      return false;
    }
    const data = await res.json();
    const result = validateFn ? validateFn(data) : true;
    if (result) {
      console.log(`${colors.green}✔ PASS${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}FAILED (Validation failed)${colors.reset}`);
      return false;
    }
  } catch (err) {
    console.log(`${colors.red}FAILED (${err.message})${colors.reset}`);
    return false;
  }
}

async function checkWebDevServer() {
  process.stdout.write(`  ▶ Testing Web Admin Portal (Vite HTTP 5173)   `);
  try {
    const res = await fetch(WEB_BASE);
    if (res.ok) {
      const html = await res.text();
      if (html.includes('html') || html.includes('root') || html.includes('script')) {
        console.log(`${colors.green}✔ PASS${colors.reset}`);
        return true;
      }
    }
    console.log(`${colors.red}FAILED (HTTP ${res.status})${colors.reset}`);
    return false;
  } catch (err) {
    console.log(`${colors.red}FAILED (${err.message})${colors.reset}`);
    return false;
  }
}

async function run() {
  console.log(`\n${colors.cyan}${colors.bold}====================================================${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}🕌 Hermosa-Tourism Halal & Mosque System Smoke Test 🕌${colors.reset}`);
  console.log(`${colors.cyan}${colors.bold}====================================================${colors.reset}\n`);

  let passed = 0;
  let total = 0;

  // 1. Web Portal Server
  total++;
  if (await checkWebDevServer()) passed++;

  // 2. API Health
  total++;
  if (
    await checkEndpoint(
      'API Health & Region Service',
      `${API_BASE}/health`,
      (d) => d.status === 'healthy' && d.regions.length >= 2
    )
  ) passed++;

  // 3. POIs and Mosques
  total++;
  if (
    await checkEndpoint(
      'Zamboanga POIs & Masjids Directory',
      `${API_BASE}/pois`,
      (d) => Array.isArray(d.data) && d.data.length > 0
    )
  ) passed++;

  // 4. MSME Halal Self-Declaration Applications
  total++;
  if (
    await checkEndpoint(
      'MSME Halal Self-Declaration Intake Queue',
      `${API_BASE}/msme/applications`,
      (d) => Array.isArray(d.data)
    )
  ) passed++;

  // 5. Prayer Times & Qibla Timings
  total++;
  if (
    await checkEndpoint(
      'Prayer Times Calculation Engine (Zamboanga)',
      `${API_BASE}/prayers/today`,
      (d) => d.data && d.data.timings && d.data.timings.fajr
    )
  ) passed++;

  // 6. Low-Bandwidth Offline Sync Bundle
  total++;
  if (
    await checkEndpoint(
      'Low-Bandwidth Offline Sync Data Bundle',
      `${API_BASE}/sync/bundle`,
      (d) => d.success === true && Array.isArray(d.pois) && d.pois.length > 0
    )
  ) passed++;

  console.log(`\n${colors.bold}Smoke Test Summary: ${passed}/${total} checks passed.${colors.reset}`);
  if (passed === total) {
    console.log(`${colors.green}${colors.bold}✨ All systems operational and ready for presentation tomorrow! ✨${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}⚠️ Some components need inspection before tomorrow's pitch.${colors.reset}\n`);
    process.exit(1);
  }
}

run();
