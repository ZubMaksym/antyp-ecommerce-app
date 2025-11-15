import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ddappsfa.blob.core.windows.net/**'),
      new URL('https://www.antyp.com.ua/**'),
      new URL('http://138.199.224.156:2007/**'),
      new URL('http://138.199.224.156:9010/**'),
    ],
  },
  allowedDevOrigins: ['http://26.118.106.156:3000']
};

export default nextConfig;
