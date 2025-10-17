import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://ddappsfa.blob.core.windows.net/**'),
      new URL('https://www.antyp.com.ua/**'),
      new URL('http://138.199.224.156:9010/**'),
    ],
  },
};

export default nextConfig;
