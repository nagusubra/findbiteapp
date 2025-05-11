import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unxogilsnswceszwrbng.supabase.co',
        pathname: '**',
      },
    ],
  },experimental: {
    serverActions: {
      bodySizeLimit: '16mb'
    }
  }
};

export default nextConfig;
