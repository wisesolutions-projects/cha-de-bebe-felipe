import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/cha-de-bebe',
  assetPrefix: '/cha-de-bebe',
  images: {
    unoptimized: true
  }
};

export default nextConfig;