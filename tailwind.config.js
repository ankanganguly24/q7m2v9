/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./features/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        positive: "hsl(var(--positive))",
        warning: "hsl(var(--warning))",
        landing: {
          ink: "hsl(var(--landing-ink))",
          panel: "hsl(var(--landing-panel))",
          paper: "hsl(var(--landing-paper))",
          muted: "hsl(var(--landing-muted))",
          line: "hsl(var(--landing-line))",
          signal: "hsl(var(--landing-signal))",
          "signal-ink": "hsl(var(--landing-signal-ink))",
        },
      },
      fontFamily: {
        sans: ["var(--font-gridline-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-gridline-sans)", "Arial", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
      },
    },
  },
  plugins: [],
};
