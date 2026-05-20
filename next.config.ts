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
  // Single-page site, except case studies: each /work/<slug> is a real
  // page, so it is NOT redirected. The other old external pages are gone;
  // 301 their URLs (likely indexed / on CV / LinkedIn) to the matching
  // home anchor so inbound links and SEO equity survive. /lab is dropped.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/archive", destination: "/#work", permanent: true },
      { source: "/lab", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
