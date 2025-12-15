import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddappsfa.blob.core.windows.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.antyp.com.ua',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '138.199.224.156',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '62.171.154.171',
        pathname: '/**',
      }
    ],
  },
  allowedDevOrigins: ['http://62.171.154.171:5000/'],
};

export default nextConfig;