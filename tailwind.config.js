/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        douyin: {
          primary: '#FE2C55',
          secondary: '#25F4EE',
          dark: '#000000',
          darkGray: '#161823',
          lightGray: '#1F1F1F',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 10px rgba(254, 44, 85, 0.5)',
        'neon-cyan': '0 0 10px rgba(37, 244, 238, 0.5)',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
