/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // --- Core Brand ---
        primary: {
          DEFAULT: '#2D4A3E',       // deep forest green — main CTA, active chips, buttons
          light: 'rgba(45,74,62,0.05)',  // active card bg tint
          border: 'rgba(45,74,62,0.4)', // hover chip border
          muted: 'rgba(45,74,62,0.2)',  // inactive step dots
          foreground: '#FAF9F5',    // text/icons on primary bg (near-white cream)
        },

        // --- Backgrounds ---
        background: {
          DEFAULT: '#FAF8F5',       // main app background (warm off-white)
          overlay: 'rgba(250,248,245,0.95)', // bottom bar backdrop
          blur: 'rgba(250,248,245,0.8)',     // back button backdrop
        },

        // --- Surfaces ---
        card: '#FFFFFF',            // cards, inputs, Google button bg

        // --- Foreground / Text ---
        foreground: '#1A2E26',      // headings, primary text (very dark green)
        'muted-foreground': '#6B7D6F', // subtext, labels, placeholders

        // --- Secondary ---
        secondary: '#EDF1EB',       // back button bg, Google button hover

        // --- Borders ---
        border: {
          DEFAULT: '#DDE3DA',       // input borders, card borders, dividers
          muted: 'rgba(221,227,218,0.6)', // bottom bar top border
        },

        // --- Status ---
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#38BDF8',

        // --- Badge / Difficulty ---
        badge: {
          easy: '#22C55E',
          moderate: '#F59E0B',
          hard: '#EF4444',
        },
      },

      fontFamily: {
        // Serif for headings (matches the editorial feel in designs)
        heading: ['Lora_700Bold'],
        subheading: ['Lora_600SemiBold'],
        // Clean sans for body
        body: ['DMSans_400Regular'],
        caption: ['DMSans_300Light'],
        label: ['DMSans_500Medium'],
      },

      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },

      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
    },
  },
  plugins: [],
};