/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Mantido: Garante o comportamento estrito para identificação de problemas.
  reactStrictMode: true,

  // 2. REMOVIDO: swcMinify. Agora é o padrão no Next.js 13+ e não deve ser declarado.
  // swcMinify: true,

  // 3. Configurações do ESLint (Mantido)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4. Configurações do TypeScript (Mantido)
  typescript: {
    ignoreBuildErrors: false,
  },

  // 5. CORRIGIDO: experimental.turbo foi substituído pelo bloco 'turbopack' no root.
  // Você não precisa mais do bloco 'experimental' se 'turbo' era o único item.
  turbopack: {
    // Manter este bloco vazio ou adicionar configurações avançadas se necessário.
  },

  // 6. Configurações do Compiler (Mantido)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 7. Configurações de Imagens (Mantido)
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'books.google.com.br' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
    ],
  },
};

module.exports = nextConfig;
