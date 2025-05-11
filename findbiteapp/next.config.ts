import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unxogilsnswceszwrbng.supabase.co'],
  },  experimental: {
    serverActions: {
      bodySizeLimit: '16mb'
    }
  }
};

export default nextConfig;
