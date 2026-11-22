import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: 'export',  // 啟用靜態輸出
  basePath: BASE_PATH,
  trailingSlash: true,
  images: {
    unoptimized: true,  // 靜態輸出時必須開啟
  },
  generateEtags: false
};

export default nextConfig;
