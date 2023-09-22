/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
