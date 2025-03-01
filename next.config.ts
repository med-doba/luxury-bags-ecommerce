import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "www.yourprint.in",
      "fastly.picsum.photos",
      "images.unsplash.com",
      "plus.unsplash.com",
      "eu.louisvuitton.com",
      "img.freepik.com",
    ], // ✅ Add allowed image domain
  },
};

export default nextConfig;
