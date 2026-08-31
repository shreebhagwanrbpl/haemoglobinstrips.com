export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://haemoglobinstrips.com";
export const SITE_NAME = "Raj Biosis";
export const DEFAULT_TITLE = "Haemoglobin Test Strips & Reagents Consumables | Raj Biosis";
export const DEFAULT_DESCRIPTION = "Trusted supplier and distributor of clinical-grade haemoglobin test strips, biochemistry testing reagents, rapid test kits, and medical lab consumables in India.";

export const DEFAULT_KEYWORDS = [
  "Haemoglobin Test Strips",
  "Haemoglobinometer Test Strips",
  "Hb Strips Consumables",
  "Clinical Reagent Strips",
  "Diagnostic Blood Strips",
  "Hb Meter Strip Supplier",
  "Blood Testing Strips",
  "Rapid Hb Test Strips"
];

export function getCanonicalUrl(path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false
}) {
  const finalTitle = title ? title : DEFAULT_TITLE;
  const finalDescription = description ? description : DEFAULT_DESCRIPTION;
  const canonical = getCanonicalUrl(path);

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: Array.from(new Set([...keywords, ...DEFAULT_KEYWORDS])),
    alternates: {
      canonical,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [`${SITE_URL}/logo.png`],
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": `${SITE_URL}/logo.png`,
  "description": DEFAULT_DESCRIPTION,
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9983123469",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-9983333489",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "F-4, 1st Floor, Plot No. 16, D-Block Tagor Nagar, on Ajmer-Delhi, 200 Feet Bypass Rd",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "postalCode": "302021",
    "addressCountry": "IN"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": SITE_NAME,
  "url": SITE_URL
};

export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": getCanonicalUrl(item.path)
      }))
    ]
  };
}
