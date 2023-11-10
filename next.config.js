/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "tecdn.b-cdn.net",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
    ],
  },
  swcMinify: true
};

module.exports = nextConfig;
