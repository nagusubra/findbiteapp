import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['unxogilsnswceszwrbng.supabase.co'],
  },
  experimental: {
    serverActions: true,
  }
};

export default nextConfig;
