/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic brand tokens — values are stock Tailwind colours only
        // (slate for structure, cyan for the brand blue from the 3D logo render).
        paper: "#f8fafc", // slate-50 — page background
        ink: "#0f172a", // slate-900 — primary text on light surfaces
        "ink-inverse": "#f8fafc", // slate-50 — text on the navy band
        muted: "#475569", // slate-600 — secondary text
        "muted-inverse": "#94a3b8", // slate-400 — secondary text on navy
        accent: "#0e7490", // cyan-700 — interactive: links, CTAs, focus rings (AA on paper)
        "accent-hover": "#155e75", // cyan-800 — hover state for accent
        "accent-visual": "#22d3ee", // cyan-400 — decorative only, never link/body text on light
        navy: "#0f172a", // slate-900 — dark section band background
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
      },
      backgroundImage: {
        "header-background": "url('/images/bambrella-umbrella-hr.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundPosition: {
        topright: "top right",
        right: "right",
        'bottom-10': 'center bottom 10%',
        'bottom-20': 'center bottom 20%',
        'bottom-25': 'center bottom 25%',
        'bottom-30': 'center bottom 30%',
        'bottom-40': 'center bottom 40%',
      },
      backgroundSize: {
        "50%": "50%",
        "60%": "60%",
        "70%": "70%",
        "80%": "80%",
        "90%": "90%",
      },
      animation: {
        fadeInOut: "fadeInOut 6s ease-in-out infinite",
        fadeIn: "fadeIn 10s forwards",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        transitionDelay: { 2000: "2000ms", 4000: "4000ms" },
        plugins: [],
      },
    },
  },
};
