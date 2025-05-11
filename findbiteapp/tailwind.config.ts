/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        input: '#e5e7eb',
        ring: '#3b82f6',
      },
    },
  },
};

export default tailwindConfig;
