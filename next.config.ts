import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/cha-de-bebe-baby-monteiro',
  assetPrefix: '/cha-de-bebe-baby-monteiro',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
