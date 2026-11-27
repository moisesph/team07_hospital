import type { NextConfig } from "next";

const allowedDevOrigins = Array.from(
  new Set([
    "192.168.*.*",
    "10.*.*.*",
    "*.local",
    ...(process.env.ALLOWED_DEV_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ]),
);

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
