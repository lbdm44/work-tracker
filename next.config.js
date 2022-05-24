/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.prisma.io',
      'www.apollographql.com',
      'tailwindcss.com',
      'nextjs.org',
    ],
  },
};

module.exports = nextConfig;
