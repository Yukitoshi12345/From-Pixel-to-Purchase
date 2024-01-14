/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.js", "./**/*.html"],
    theme: {
      extend: {
        fontFamily:{
            logo:['Great Vibes'],
            heading: ['Kalnia'],
            body: ['Poppins'],
          },
          keyframes: {
            flip: {
              '0%': { transform: 'rotate(-20deg)','z-index': 0 },
              '25%': { transform: 'rotate(0deg)','z-index': 4 },
              '50%': { transform: 'rotate(20deg)','z-index': 3 },
              '75%': { transform: 'rotate(0deg)','z-index': 2 },
              '100%': { transform: 'rotate(-20deg)','z-index': 1 }
            },
            grow: {
              '0%': { transform: 'scaleX(1)' },
              '50%': { transform: 'scaleX(1.2)'},
              '100%': { transform: 'scaleX(1)' }
            }
          },
          animation: {
            'fliping-card1':'flip 4s linear infinite',
            'fliping-card2':'flip 4s linear infinite 1s',
            'fliping-card3':'flip 4s linear infinite 2s',
            'fliping-card4':'flip 4s linear infinite 3s',
            'grow':'grow 2s linear infinite'            
          },
          gridTemplateColumns: {
            'auto-fill' : 'repeat(auto-fill, minmax(18em, 1fr))'
          },
        },
    },
    plugins: [],
  }