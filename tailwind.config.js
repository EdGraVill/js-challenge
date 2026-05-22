/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        hide: {
          to: { transform: 'translateX(0%)' },
        },
        hideBackdrop: {
          to: { opacity: 0 },
        },
        show: {
          from: { transform: 'translateX(-110%)' },
          to: { transform: 'translateX(0%)' },
        },
        showBackdrop: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
};
