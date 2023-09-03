/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#193296',
      black: '#000000',
      primary2: 'rgb(13, 110, 253)',
      primary3: 'rgb(13, 110, 253, 0.1)',
      secondary: '#FE7D06',
      secondary11: 'rgb(254, 125, 6, 0.1)',
      blue1: 'rgb(13, 202, 240)',
      blue11: 'rgb(13, 202, 240, 0.1)',
      gray1: 'rgb(243 244 246)',
      gray2: 'rgb(229 231 235)',
      gray3: 'rgb(209 213 219)',
      gray4: 'rgb(156 163 175)',
      gray5: 'rgb(107 114 128)',
      gray11: 'rgb(25, 50, 150, 0.1)',
      gray10: '#F6F3FF',
      white: '#ffffff',
      red: '#ff0000',
      red1: 'rgb(255, 0, 0, 0.1)',
      warning: '#d97706',
      green: 'rgb(21 128 61)',
      green11: 'rgb(21 128 61, 0.2)',
      orange: 'rgb(251 146 60)',
      yellow: '#fabb00',
      yellow11: 'rgb(250, 187, 0, 0.1)'
    }
  },
  plugins: [],
}