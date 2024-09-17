import type { Config } from 'tailwindcss';

import tokens from './src/tokens/tokens';

const { colors, boxShadow } = tokens;

const config: Config = {
  safelist: [
    'bg-type-normal',
    'bg-type-fire',
    'bg-type-poison',
    'bg-type-fighting',
    'bg-type-flying',
    'bg-type-rock',
    'bg-type-ground',
    'bg-type-bug',
    'bg-type-ghost',
    'bg-type-steel',
    'bg-type-water',
    'bg-type-electric',
    'bg-type-grass',
    'bg-type-psychic',
    'bg-type-ice',
    'bg-type-dragon',
    'bg-type-dark',
    'bg-type-fairy',
    'bg-type-unknown',
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors,
    extend: { boxShadow },
  },
  plugins: [],
};
export default config;
