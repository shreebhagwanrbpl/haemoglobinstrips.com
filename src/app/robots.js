export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/api",
        "/search",
        "/filter",
        "*?*", // Blocks all trailing query parameter variations (sorting, pagination filters)
      ],
    },
    sitemap: "https://haemoglobinstrips.com/sitemap.xml",
  };
}
