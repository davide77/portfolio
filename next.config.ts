import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Some project cover art (Origin Social, LOVA) ships as first-party static
  // SVG. next/image refuses SVG unless explicitly opted in. These are our own
  // hand-authored files with no scripts; the CSP + sandbox below keep any SVG
  // served through the optimiser inert (no script execution, no external refs).
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
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
  // Baseline security headers. HSTS is widened to cover subdomains and
  // request preload-list inclusion. A Content-Security-Policy is left out
  // for now: it needs the Plausible origin and the self-hosted next/font
  // assets enumerated and tested in Report-Only first before enforcing.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
