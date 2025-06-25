/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [], // Empty array or list of package names
  },
  output: "standalone",
};

export default nextConfig;
