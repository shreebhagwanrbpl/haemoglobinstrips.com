// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/items",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/items/:slug",
        permanent: true,
      },
      {
        source: "/laboratory-equipment/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/diagnostic-equipment/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
      {
        source: "/biomedical-equipment/:slug",
        destination: "/category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;