import { NextResponse } from "next/server";
import { getDocument, getDocuments, queryDocuments } from "@/lib/sqliteDb";
import { WEBSITE_ID, normalizeWebsiteId, isVisibleForWebsite } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const headers = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" };
function response(data, status = 200) { return NextResponse.json(data, { status, headers }); }

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("districts") === "1") {
      const normalized = normalizeWebsiteId(WEBSITE_ID);
      const rows = queryDocuments({ likePath: "websites/%/%/districts/%" });
      return response(rows
        .filter((r) => {
          const parts = String(r.path || "").split("/").filter(Boolean);
          return parts.length >= 5 && normalizeWebsiteId(parts[2]) === normalized;
        })
        .map((r) => ({ id: r.doc_id, ...(r.data || {}) })));
    }
    const collection = searchParams.get("collection");
    if (collection) {
      // Resolve legacy client paths (websites/{website}/...) to both legacy
      // and company-grouped SQLite paths (websites/{company}/{website}/...).
      const parts = collection.split("/").filter(Boolean);
      if (parts[0] === "websites" && parts.length >= 2) {
        const requestedWebsite = parts[1];
        const tail = parts.slice(2).join("/");
        const normalized = normalizeWebsiteId(requestedWebsite);
        const patterns = [
          `websites/%/${requestedWebsite}/${tail}/%`,
          `websites/${requestedWebsite}/${tail}/%`,
        ];
        const rows = patterns.flatMap((likePath) => queryDocuments({ likePath }));
        const unique = new Map();
        for (const row of rows) {
          const pathParts = String(row.path || "").split("/").filter(Boolean);
          const siteAt = pathParts[1] === requestedWebsite ? 1 : 2;
          const siteId = pathParts[siteAt] || "";
          const parent = String(row.collection_path || "");
          if (normalizeWebsiteId(siteId) !== normalized) continue;
          if (!parent.endsWith(`/${tail}`) && parent !== `websites/${requestedWebsite}/${tail}`) continue;
          unique.set(row.path, row);
        }
        return response([...unique.values()].filter((r) => isVisibleForWebsite(r.data || {}, WEBSITE_ID)).map((r) => ({ id: r.doc_id, data: r.data })));
      }
      const rows = getDocuments(collection);
      return response(rows.filter((r) => isVisibleForWebsite(r.data || {}, WEBSITE_ID)).map((r) => ({ id: r.doc_id, data: r.data })));
    }
    let p = searchParams.get("path") || "";
    if (p.startsWith("__website__/")) {
      const pagePath = p.replace("__website__/", "");
      const rows = queryDocuments({ likePath: `websites/%/%/${pagePath}` });
      const normalized = normalizeWebsiteId(WEBSITE_ID);
      const hit = rows.find((r) => String(r.path).split("/").length >= 4 && normalizeWebsiteId(String(r.path).split("/")[2]) === normalized);
      return response(hit?.data || null);
    }
    // Direct client calls often use the old ungrouped website path. Resolve
    // that path against the actual grouped path before returning an empty value.
    const parts = p.split("/").filter(Boolean);
    if (parts[0] === "websites" && parts.length >= 3) {
      const requestedWebsite = parts[1];
      const tail = parts.slice(2).join("/");
      const normalized = normalizeWebsiteId(requestedWebsite);
      const candidates = [
        ...queryDocuments({ likePath: `websites/%/${requestedWebsite}/${tail}` }),
        ...queryDocuments({ likePath: `websites/${requestedWebsite}/${tail}` }),
      ];
      const hit = candidates.find((r) => {
        const pathParts = String(r.path || "").split("/").filter(Boolean);
        const siteAt = pathParts[1] === requestedWebsite ? 1 : 2;
        return normalizeWebsiteId(pathParts[siteAt]) === normalized;
      });
      if (hit) return response(hit.data || null);
    }
    const row = getDocument(p);
    return response(row?.data || null);
  } catch (e) { return response({ error: e.message }, 500); }
}
