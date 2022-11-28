/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: "process.env.NEXT_PUBLIC_BACKEND_HOST",
    CLOUDINARY_LINK: "process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE"
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
