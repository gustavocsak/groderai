import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API routes
        destination: "http://localhost:5000/api/:path*", // Proxy to Flask server
      },
    ];
  },
};

export default nextConfig;
