/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    minWidth: {
      500: "325px",
    },
    extend: {
      fontSize: {
        '85': '85%',
        '90': '90%',
        '92': '92%',
        '95': '95%',
        '105': '105%',
        '110': '110%',
      },
      maxWidth: {
        "8xl": "96rem",
      },
    },
  },
};
