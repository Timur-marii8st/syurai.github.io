/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--fx-paper) / <alpha-value>)',
        ink: 'rgb(var(--fx-ink) / <alpha-value>)',
        inkmute: 'rgb(var(--fx-muted) / <alpha-value>)',
        accent: 'rgb(var(--fx-accent) / <alpha-value>)',
      },
      fontFamily: {
        fserif: ['"STIX Two Text"', '"Times New Roman"', 'serif'],
        fmono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        fhand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}
