import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/cha-de-bebe' : '',
  assetPrefix: isProd ? '/cha-de-bebe' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;