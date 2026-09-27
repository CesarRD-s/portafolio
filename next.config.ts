import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rekydsbimkpqukrlqkbi.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ]
  }
};

export default nextConfig;
