import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/archive",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
