/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js", 
  ],
  theme: {
    extend: {
      colors: {
        'prog-blue': '#252525',
        'prog-gray': '#909090',
        'prog-gray-lighter': '#D9D9D9',
      },
      keyframes: {
        'slide-up': {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: 0 
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: 1 
          },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'), 
  ],
};
