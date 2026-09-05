/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [256, 384, 480, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // English is the default locale and keeps the bare URLs it always had; these
  // rewrites map them onto the /en segment internally so no existing link or
  // indexed URL changed when Turkish was added under /tr.
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/blog", destination: "/en/blog" },
      { source: "/blog/:slug", destination: "/en/blog/:slug" },
      { source: "/projects/:slug", destination: "/en/projects/:slug" },
    ];
  },
};

export default nextConfig;
