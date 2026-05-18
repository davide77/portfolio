import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });
    return config;
  },
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
