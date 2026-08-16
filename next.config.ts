import type { NextConfig } from "next";

const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages project sites need chunk URLs prefixed with /<repository>.
  // Keeping routing at / lets Vinext prerender the root route during export.
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
