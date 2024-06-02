// const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const {nextui} = require("@nextui-org/react");
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}
