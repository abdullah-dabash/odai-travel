module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Amiri', 'serif'],
        arabic: ['Amiri', 'Arial', 'Tahoma', 'serif'],
      },
      colors: {
        'jordanian': {
          gold: '#f59e0b',
          red: '#dc2626',
          sand: '#fbbf24',
          stone: '#92400e',
        }
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'slideInUp': 'slideInUp 0.8s ease-out forwards',
        'fadeInScale': 'fadeInScale 0.6s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'jordanian-pattern': 'linear-gradient(45deg, #f59e0b 25%, transparent 25%), linear-gradient(-45deg, #dc2626 25%, transparent 25%)',
      }
    },
  },
  plugins: [],
}