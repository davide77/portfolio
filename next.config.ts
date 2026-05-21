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
  // Single-page site, except for case studies (/work/<slug>) and the Lab
  // (/lab and its experiments), which are real pages. The other old
  // external URLs (likely indexed / on CV / LinkedIn) 301 to the matching
  // home anchor so inbound links and SEO equity survive.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/archive", destination: "/lab", permanent: true },
    ];
  },
};

export default nextConfig;
