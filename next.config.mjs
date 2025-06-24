/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
  },
  images: {
    unoptimized: true,
  },
  // experimental: {
  //   serverActions: true,
  // },
  // serverActions: {
  //   bodySizeLimit: '3mb', // Increase limit to 10MB
  // },
  experimental: {
    optimizePackageImports: true,
  },
  swcMinify: true,
  output: "standalone",
};

export default nextConfig;
