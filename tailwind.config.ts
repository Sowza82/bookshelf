// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // ⚡ Usa a classe 'dark' no <html>
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
          lendo: "var(--color-card-lendo)",
          lidos: "var(--color-card-lidos)",
          quero: "var(--color-card-quero)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
      transitionProperty: {
        colors: 'background-color, border-color, color',
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate'),
  ],
}

export default config
