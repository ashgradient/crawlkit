import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CrawlKit Brand
        terracotta: {
          DEFAULT: "#D4622A",
          50: "#FDF3EE",
          100: "#FAE3D5",
          200: "#F4C4A7",
          300: "#EDA07A",
          400: "#E5784C",
          500: "#D4622A",
          600: "#AA4E21",
          700: "#7F3A19",
          800: "#552710",
          900: "#2A1308",
        },
        slate: {
          DEFAULT: "#1E2D40",
          50: "#F0F4F8",
          100: "#D9E3EE",
          200: "#B2C7DC",
          300: "#8AABC9",
          400: "#628FB7",
          500: "#4A7299",
          600: "#3A5A7A",
          700: "#2C445C",
          800: "#1E2D40",
          900: "#10182A",
        },
        mint: {
          DEFAULT: "#2EC4B6",
          50: "#F0FDFB",
          100: "#CCFAF5",
          200: "#99F4EB",
          300: "#60E9DC",
          400: "#2EC4B6",
          500: "#1FA89B",
          600: "#178880",
          700: "#0F6965",
          800: "#094D4A",
          900: "#042D2C",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "stamp-in": "stamp-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "fade-up": "fade-up 0.4s ease-out forwards",
        "pulse-ring": "pulse-ring 1.5s ease-in-out infinite",
      },
      keyframes: {
        "stamp-in": {
          "0%": { transform: "scale(2) rotate(-15deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
