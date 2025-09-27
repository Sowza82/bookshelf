import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        banner: {
          default: "var(--color-banner)",
          text: "var(--color-banner-text)",
        },
        card: {
          default: "var(--color-card-bg)",
          lendo: "var(--color-card-lendo)",
          lidos: "var(--color-card-lidos)",
          quero: "var(--color-card-quero)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.375rem', // 6px padrão para botões e inputs
      },
      transitionProperty: {
        colors: 'background-color, border-color, color',
      },
    },
  },
  plugins: [],
}

export default config
