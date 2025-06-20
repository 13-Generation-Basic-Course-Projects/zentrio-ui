/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["i.pravatar.cc"],
  },
  images: {
    unoptimized: true,
  },

};

export default nextConfig;
