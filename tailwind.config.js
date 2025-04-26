// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        screens: {
            'tablet-917': '917px',
          },
          colors: {
            emerald: {
              500: '#10b981',
              600: '#059669',
              700: '#047857',
            },
          },
          animation: {
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }
      }, // Make sure screens aren't overridden here
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        scale: ['group-hover'],
      },
    },
    plugins: [],
  }