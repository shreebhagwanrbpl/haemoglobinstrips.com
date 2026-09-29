import "server-only";
import { cache } from "react";
import { getDocument, getDocuments, queryDocuments } from "./sqliteDb";
import { WEBSITE_ID, normalizeWebsiteId, isVisibleForWebsite, makeSlug } from "./catalog-utils";

function clone(v) { return v == null ? v : JSON.parse(JSON.stringify(v)); }

// Read current SQLite content on each request; avoid a process-lifetime Map
// that can keep stale page data after an admin update.
export const fetchDocCached = cache(async (path) => {
  const row = getDocument(path);
  return clone(row?.data || null);
});

export async function fetchHomeData() { return fetchWebsitePage("home"); }
export async function fetchContactData() { return fetchWebsitePage("contact"); }
export async function fetchServicesData() { return fetchWebsitePage("services"); }

export async function fetchWebsitePage(pageType) {
  const row = getDocumentByWebsitePage(pageType);
  return clone(row?.data || null);
}

function getDocumentByWebsitePage(pageType) {
  const normalized = normalizeWebsiteId(WEBSITE_ID);
  const rows = queryDocuments({ likePath: `websites/%/%/pages/${pageType}` });
  return rows.find((r) => {
    const parts = String(r.path || "").split("/");
    return parts.length >= 5 && normalizeWebsiteId(parts[2]) === normalized;
  }) || null;
}

export async function fetchDistrictData(district) {
  if (!district) return null;
  const normalized = String(district).toLowerCase();
  const website = normalizeWebsiteId(WEBSITE_ID);
  const rows = queryDocuments({ likePath: `websites/%/%/districts/${normalized}` });
  const exact = rows.find((r) => {
    const parts = String(r.path || "").split("/").filter(Boolean);
    return parts.length >= 5 && normalizeWebsiteId(parts[2]) === website;
  });
  if (exact?.data) return clone(exact.data);
  const byId = queryDocuments({ likePath: "websites/%/%/districts/%" });
  const hit = byId.find((r) => {
    const parts = String(r.path || "").split("/").filter(Boolean);
    return parts.length >= 5 && normalizeWebsiteId(parts[2]) === website && normalizeWebsiteId(r.doc_id) === normalizeWebsiteId(district);
  });
  return clone(hit?.data || null);
}

function resolveCompanyId() {
  if (process.env.COMPANY_ID) return process.env.COMPANY_ID;
  const rows = queryDocuments({ likePath: `websites/%/%/pages/contact` });
  const normalized = normalizeWebsiteId(WEBSITE_ID);
  const hit = rows.find((r) => {
    const p = String(r.path || "").split("/");
    return p.length >= 5 && normalizeWebsiteId(p[2]) === normalized;
  });
  if (hit) return String(hit.path).split("/")[1];
  return "rajbiosis";
}

function firstValue(obj, keys, fallback = "") {
  for (const key of keys) if (obj?.[key] != null && obj[key] !== "") return obj[key];
  return fallback;
}

function productFrom(raw, category, subCategory, uid) {
  if (!raw || typeof raw !== "object") return null;
  const title = firstValue(raw, ["title", "name", "productName"]);
  if (!title) return null;
  return {
    ...raw,
    uid: raw.uid || uid,
    title,
    slug: raw.slug || makeSlug(title),
    category: raw.category || category || "Other Products",
    subCategory: raw.subCategory || raw.subcategory || subCategory || category || "Other Products",
  };
}

function collectEmbeddedProducts(raw, category, subCategory, uidPrefix) {
  const arrays = [raw?.products, raw?.items, raw?.categoryProducts].filter(Array.isArray);
  const out = [];
  arrays.forEach((arr) => arr.forEach((p, i) => out.push(productFrom(p, category, subCategory, `${uidPrefix}-${i}`))));
  return out.filter(Boolean);
}

export const fetchFullCatalog = cache(async () => {
  const companyId = resolveCompanyId();
  const websiteId = WEBSITE_ID;
  const products = [];
  const seen = new Set();

  const categories = getDocuments(`companies/${companyId}/categories`);
  for (const categoryRow of categories) {
    const categoryData = categoryRow.data || {};
    if (!isVisibleForWebsite(categoryData, websiteId)) continue;
    const categoryName = firstValue(categoryData, ["category", "name", "title"], categoryRow.doc_id);
    const categoryId = categoryRow.doc_id;

    const subRows = getDocuments(`companies/${companyId}/categories/${categoryId}/subcategories`);
    for (const subRow of subRows) {
      const subData = subRow.data || {};
      if (!isVisibleForWebsite(subData, websiteId)) continue;
      const subName = firstValue(subData, ["subCategory", "subcategory", "name", "title"], subRow.doc_id);
      for (const p of collectEmbeddedProducts(subData, categoryName, subName, `${categoryId}-${subRow.doc_id}`)) {
        if (!isVisibleForWebsite(p, websiteId)) continue;
        const key = `${p.slug}|${p.title}`.toLowerCase();
        if (!seen.has(key)) { seen.add(key); products.push(p); }
      }
      const separateProducts = getDocuments(`companies/${companyId}/categories/${categoryId}/subcategories/${subRow.doc_id}/products`);
      for (const row of separateProducts) {
        if (!isVisibleForWebsite(row.data || {}, websiteId)) continue;
        const p = productFrom(row.data, categoryName, subName, `${categoryId}-${subRow.doc_id}-${row.doc_id}`);
        if (!p) continue;
        const key = `${p.slug}|${p.title}`.toLowerCase();
        if (!seen.has(key)) { seen.add(key); products.push(p); }
      }
    }

    for (const p of collectEmbeddedProducts(categoryData, categoryName, categoryName, `${categoryId}-direct`)) {
      if (!isVisibleForWebsite(p, websiteId)) continue;
      const key = `${p.slug}|${p.title}`.toLowerCase();
      if (!seen.has(key)) { seen.add(key); products.push(p); }
    }
  }

  for (const row of getDocuments(`companies/${companyId}/products`)) {
    const p = productFrom(row.data, row.data?.category || "Other Products", row.data?.subCategory || row.data?.subcategory || "Other Products", `master-${row.doc_id}`);
    if (!p || !isVisibleForWebsite(p, websiteId)) continue;
    const key = `${p.slug}|${p.title}`.toLowerCase();
    if (!seen.has(key)) { seen.add(key); products.push(p); }
  }

  // Legacy/site-specific fallback: older admin records may still live under
  // websites/{company}/{website}/pages/{products|categoryproducts}.
  const normalizedWebsite = normalizeWebsiteId(websiteId);
  const siteRows = queryDocuments({ likePath: "websites/%/%/pages/products" });
  for (const row of siteRows) {
    const parts = String(row.path || "").split("/").filter(Boolean);
    if (parts.length < 5 || normalizeWebsiteId(parts[2]) !== normalizedWebsite) continue;
    for (const p of collectEmbeddedProducts(row.data || {}, "Other Products", "Other Products", `legacy-${row.doc_id}`)) {
      if (!isVisibleForWebsite(p, websiteId)) continue;
      const key = `${p.slug}|${p.title}`.toLowerCase();
      if (!seen.has(key)) { seen.add(key); products.push(p); }
    }
  }

  const categoryRows = queryDocuments({ likePath: "websites/%/%/pages/categoryproducts/categories/%" });
  const siteCategories = categoryRows.filter((row) => {
    const parts = String(row.path || "").split("/").filter(Boolean);
    return parts.length === 7 && normalizeWebsiteId(parts[2]) === normalizedWebsite && String(row.collection_path || "").endsWith("/pages/categoryproducts/categories");
  });
  const categoryNames = new Map(siteCategories.map((row) => [row.doc_id, firstValue(row.data || {}, ["category", "name", "title"], row.doc_id)]));
  const subRows = queryDocuments({ likePath: "websites/%/%/pages/categoryproducts/categories/%/subcategories/%" });
  for (const row of subRows) {
    const parts = String(row.path || "").split("/").filter(Boolean);
    if (parts.length !== 9 || normalizeWebsiteId(parts[2]) !== normalizedWebsite || !String(row.collection_path || "").endsWith("/subcategories")) continue;
    const categoryId = parts[6];
    const categoryName = categoryNames.get(categoryId) || row.data?.category || "Other Products";
    const subName = firstValue(row.data || {}, ["subCategory", "subcategory", "name", "title"], row.doc_id);
    for (const p of collectEmbeddedProducts(row.data || {}, categoryName, subName, `legacy-${categoryId}-${row.doc_id}`)) {
      if (!isVisibleForWebsite(p, websiteId)) continue;
      const key = `${p.slug}|${p.title}`.toLowerCase();
      if (!seen.has(key)) { seen.add(key); products.push(p); }
    }
  }

  return products;
});

export async function fetchActiveDistricts() {
  const normalized = normalizeWebsiteId(WEBSITE_ID);
  const rows = queryDocuments({ likePath: "websites/%/%/districts/%" });
  return rows
    .filter((r) => {
      const parts = String(r.path || "").split("/").filter(Boolean);
      return parts.length >= 5 && normalizeWebsiteId(parts[2]) === normalized;
    })
    .map((r) => ({ id: r.doc_id, ...(r.data || {}) }));
}
export const fetchAllDistricts = fetchActiveDistricts;
