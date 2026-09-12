/** @type {import('next').NextConfig} */
const nextConfig = {
  watchOptions: {
    pollIntervalMs: 1000,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
