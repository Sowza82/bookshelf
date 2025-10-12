// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      // --- Amazon (livros, Kindle, etc.) ---
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },

      // --- Google Books e Google Images ---
      { protocol: "https", hostname: "books.google.com" },
      { protocol: "https", hostname: "books.google.com.br" },
      { protocol: "https", hostname: "books.googleusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },

      // --- Open Library (livros públicos) ---
      { protocol: "https", hostname: "covers.openlibrary.org" },

      // --- Goodreads e similares ---
      { protocol: "https", hostname: "images.gr-assets.com" },

      // --- Wikipedia / Wikimedia (capas antigas) ---
      { protocol: "https", hostname: "upload.wikimedia.org" },

      // --- Placeholder / teste ---
      { protocol: "https", hostname: "via.placeholder.com" },

      // --- Outras URLs genéricas de imagens CDN ---
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "static.wikia.nocookie.net" },
    ],
  },

  turbopack: {},
};

module.exports = nextConfig;
