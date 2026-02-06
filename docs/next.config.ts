import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/skills-mcp-server",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
