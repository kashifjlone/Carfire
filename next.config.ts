import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output ensures container portability for Docker, AWS ECS/App Runner, and Vercel
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },
  experimental: {
    // Enable performance optimizations
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
