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
        port: '9010',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '138.199.224.156',
        port: '2007',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '138.199.224.156',
        port: '9010',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['http://26.118.106.156:3000'],
};

export default nextConfig;