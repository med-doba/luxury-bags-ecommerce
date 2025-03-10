// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: [
//       "www.yourprint.in",
//       "fastly.picsum.photos",
//       "images.unsplash.com",
//       "plus.unsplash.com",
//       "eu.louisvuitton.com",
//       "img.freepik.com",
//       "media.gucci.com",
//       "drive.google.com",
//       "hebbkx1anhila5yf.public.blob.vercel-storage.com",
//     ], // ✅ Add allowed image domain
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone", // Required for full-stack Next.js apps
  reactStrictMode: true,

  images: {
    domains: ["localhost"], // Only needed if serving from an external source
    unoptimized: true, // Allows local images
  },
  // Add configuration for serving static files from the uploads directory
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "drive.google.com",
//       },
//       {
//         protocol: "https",
//         hostname: "www.yourprint.in",
//       },
//       {
//         protocol: "https",
//         hostname: "fastly.picsum.photos",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "plus.unsplash.com",
//       },
//       {
//         protocol: "https",
//         hostname: "eu.louisvuitton.com",
//       },
//       {
//         protocol: "https",
//         hostname: "img.freepik.com",
//       },
//       {
//         protocol: "https",
//         hostname: "media.gucci.com",
//       },
//     ],
//   },
// };

// export default nextConfig;
