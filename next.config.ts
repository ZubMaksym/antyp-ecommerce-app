import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ddappsfa.blob.core.windows.net/**'), new URL('https://www.antyp.com.ua/**')],
  },
};

export default nextConfig;
