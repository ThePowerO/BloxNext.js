import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'v2': "0 1rem 3rem rgba(0, 0, 0, 0.175)"
      },
      backgroundColor: {
        'MainBg': '#1F2028',
      },
      textColor: {
        'CustomBlack': '#021124',
      },
    },
  },
  plugins: [nextui()],
}
export default config
