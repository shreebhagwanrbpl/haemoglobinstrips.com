import {
  fetchFullCatalog as fetchFullCatalogRaw,
  fetchAllDistricts as fetchAllDistrictsRaw,
  fetchDistrictData as fetchDistrictDataRaw,
  fetchContactData as fetchContactDataRaw,
  fetchServicesData as fetchServicesDataRaw,
} from "./data-fetcher";
import { cache } from "react";

// Global in-memory cache for the server process to bypass Next.js 2MB unstable_cache limit
let cachedCatalog = null;
let cachedCatalogTimestamp = 0;
const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

async function getCachedCatalog() {
  const now = Date.now();
  if (cachedCatalog && (now - cachedCatalogTimestamp) < CACHE_TTL) {
    console.log(`[data-fetcher-server] Serving catalog from server memory cache (${((now - cachedCatalogTimestamp) / 1000).toFixed(1)}s old)`);
    return cachedCatalog;
  }

  console.log("[data-fetcher-server] Server memory cache miss or expired. Fetching raw catalog from Firestore...");
  const data = await fetchFullCatalogRaw();
  cachedCatalog = data;
  cachedCatalogTimestamp = now;
  return data;
}

export const fetchFullCatalog = cache(async () => {
  const start = performance.now();
  const products = await getCachedCatalog();
  const end = performance.now();
  console.log(`[data-fetcher-server] fetchFullCatalog took ${(end - start).toFixed(2)}ms`);
  return products;
});

// Districts cache
let cachedDistricts = null;
let cachedDistrictsTimestamp = 0;

async function getCachedDistricts() {
  const now = Date.now();
  if (cachedDistricts && (now - cachedDistrictsTimestamp) < CACHE_TTL) {
    return cachedDistricts;
  }
  const data = await fetchAllDistrictsRaw();
  cachedDistricts = data;
  cachedDistrictsTimestamp = now;
  return data;
}

export const fetchAllDistricts = cache(async () => {
  return getCachedDistricts();
});

const cachedDistrictData = {};
export const fetchDistrictData = cache(async (district) => {
  if (!district) return null;
  if (!cachedDistrictData[district]) {
    cachedDistrictData[district] = await fetchDistrictDataRaw(district);
  }
  return cachedDistrictData[district];
});

export const fetchContactData = cache(async () => {
  return fetchContactDataRaw();
});

export const fetchServicesData = cache(async () => {
  return fetchServicesDataRaw();
});

