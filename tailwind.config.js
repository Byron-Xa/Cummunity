/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        desing: ['Desing'], // ✅ No uses punto y coma aquí
      },
      colors: {
        'primary': {
          100: '#E6F3FF', // Celeste muy claro
          200: '#CCE7FF', // Celeste claro
          300: '#99CEFF', // Celeste
          400: '#66B5FF', // Celeste intenso
          500: '#3399FF', // Azul
          600: '#0066CC', // Azul intenso
          700: '#004C99', // Azul oscuro
          800: '#003366', // Azul muy oscuro
          900: '#001933', // Azul profundo
        },
        'secondary': {
          300: '#80CBC4', // Verdeazul claro
          500: '#009688', // Verdeazul
          700: '#00695C', // Verdeazul oscuro
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-primary-700',
    'text-primary-100',
    'text-primary-200',
    'bg-secondary-300',
    'bg-secondary-500',
    'hover:bg-secondary-500',
    'border-primary-600',
    'text-primary-800'
  ]
}