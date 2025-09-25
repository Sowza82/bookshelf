/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com.br',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      // NOVO DOMÍNIO ADICIONADO AQUI
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
  },
};

module.exports = nextConfig;
