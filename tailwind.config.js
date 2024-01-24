/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: '',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primo: {
          '50': '#eefffd',
          '100': '#c4fffe',
          '200': '#89fffe',
          '300': '#46fffc',
          '400': '#11eff0',
          '500': '#00d0d4',
          '600': '#00a4ab',
          '700': '#007f87',
          '800': '#04666d',
          '900': '#095358',
          '950': '#003036',
        },
      }
    },
  },
  plugins: [],
}
