import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      // Omit search only for portfolio files to permit stable ?v=<content hash>.
      { pathname: "/portfolio/**" },
      { pathname: "/**", search: "" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
