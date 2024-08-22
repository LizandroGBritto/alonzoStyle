/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite/lib/esm/**/*.js',
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
}

