/* Bloomora – Tailwind play CDN custom configuration
   Central palette + fonts for the whole template.
   Swap with a compiled build for production. */
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF6F8', 100: '#FBEAF0', 200: '#F6D5E1', 300: '#E8A5BE',
          400: '#E8A5BE', 500: '#D985A5', 600: '#F2C0D3', 700: '#A24B6E',
          800: '#853A58', 900: '#662C45'
        },
        leaf: {
          50: '#f3faf4', 100: '#e3f3e6', 200: '#c7e7cf', 300: '#9cd3ac',
          400: '#6ab681', 500: '#469a62', 600: '#347c4d', 700: '#2b6340',
          800: '#255036', 900: '#1e422d'
        },
        honey: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
          800: '#92400e', 900: '#78350f'
        },
        cocoa: {
          50: '#f7f6f4', 100: '#efede8', 200: '#dcd7ce', 300: '#c2b9a9',
          400: '#a2947f', 500: '#8a7b66', 600: '#6f6251', 700: '#574d41',
          800: '#3f3932', 900: '#2b2722', 950: '#1d1a17'
        },
        cream: '#faf7f2'
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(44, 33, 27, 0.14)',
        lift: '0 24px 60px -18px rgba(44, 33, 27, 0.22)',
        glow: '0 10px 32px -10px rgba(133, 58, 88, 0.32)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        }
      }
    }
  }
};
