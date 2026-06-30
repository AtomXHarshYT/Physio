/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "172.16.28.84",
    "172.16.28.4",
    "10.59.11.84",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rdcovrzmuhjosjhrtjva.supabase.co",
      },
    ],
  },
};

export default nextConfig;