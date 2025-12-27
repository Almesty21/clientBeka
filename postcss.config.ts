// postcss.config.ts
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,
    autoprefixer, // Ensure autoprefixer is included
  ],
};
// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'), // Add autoprefixer for better CSS compatibility
  ],
};
