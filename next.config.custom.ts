import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // NO basePath/assetPrefix para domínio customizado
  images: {
    unoptimized: true
  }
};

export default nextConfig;