import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://ddappsfa.blob.core.windows.net/**')],
  },
};

export default nextConfig;
