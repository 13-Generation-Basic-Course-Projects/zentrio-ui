const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    '// Or if using `src` directory:\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\n    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"./src/**/*.{js,ts,jsx,tsx,mdx}\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"',
    "./node_modules/@heroui/theme/dist/components/(calendar|card|input|modal|skeleton|tabs|button|ripple|spinner|form).js",
  ],
  theme: {
    // Define font sizes
    fontSize: {
      // Headings
      h1: "2.5rem", // ~40px at 16px root
      h2: "2rem", // ~32px
      h3: "1.75rem", // ~28px
      h4: "1.5rem", // ~24px
      h5: "1.25rem", // ~20px
      h6: "1rem", // ~16px

      // Body
      body: "1rem", // ~16px
      "body-sm": "0.875rem", // ~14px
      "body-lg": "1.125rem", // ~18px

      // Captions
      caption: "0.75rem", // ~12px
      "caption-tiny": "0.625rem", // ~10px

      // Buttons
      btn: "1rem", // ~16px
      "btn-sm": "0.875rem", // ~14px
      "btn-lg": "1.125rem", // ~18px

      // Descriptions
      desc: "0.875rem", // ~14px
      "desc-lg": "1rem", // ~16px

      // Navigation
      nav: "1rem", // ~16px
      "nav-dropdown": "0.875rem", // ~14px

      // Labels
      label: "0.875rem", // ~14px
      "label-sm": "0.75rem", // ~12px

      // Inputs
      input: "1rem", // ~16px
      "input-placeholder": "0.875rem", // ~14px
    },

    // Define responsive breakpoints

    extend: {
      // Gradient Color
      backgroundImage: {
        "custom-gradient": "linear-gradient(90deg, #59BAD5, #ABAAFF, #59BAD5)",

        "board-purple": "linear-gradient(135.8deg, #ffffff, #800080)",
        "board-orange": "linear-gradient(145.88deg, #ffffff, #ffbc6b, #ff8c00)",
        "board-green": "linear-gradient(138.29deg, #ffffff, #008000)",
        "board-red": "linear-gradient(138.66deg, #ff0000, #ffffff, #ff0000)",
        "board-violet": "linear-gradient(138.66deg, #8A2BE2, #DA70D6, #8A2BE2)", //add new
        "board-primary":
          "linear-gradient(140.08deg, #59bad5, #ffffff, #59bad5)",
        "login-gradient": "linear-gradient(-50deg, rgba(255, 255, 255, 0.5) 48%, rgba(155, 219, 253, 0.3) 50%)", 
        "signup-gradient": "linear-gradient(-55deg, rgba(255, 255, 255, 0.5) 48%, rgba(155, 219, 253, 0.3) 35%)", 
        "verify-gradient": "linear-gradient(-38deg, rgba(255, 255, 255, 0.5) 48%, rgba(155, 219, 253, 0.3) 35%)", 
        "forgot-gradient": "linear-gradient(-38deg, rgba(255, 255, 255, 0.5) 48%, rgba(155, 219, 253, 0.3) 35%)", 
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppin: ["Poppins", "sans-serif"],
        khmer: ["Khmer", "sans-serif"],
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#59BAD5", // Custom primary color
        },
        description: "#787486", // Custom description color
        title: "#143A47", // Custom title color
        stroke: "#E2E8F0",
        blueActive: "#306BFF",
        bgColor: "#F3F7FB",

        // Progress Colors
        progress: {
          blue: "#64A9F6",
          red: "#FF4640",
          orange: "#F4855D",
          green: "#5FC381",
          purple: "#B12FED",
        },

        // Slate Colors
        slate: {
          green: "#EFFFF7",
          "green-more": "#D2ECC6",
          blue: "#EFFCFF",
          "blue-more": "#CDEBFE",
          red: "#FFEFF0",
          "red-more": "#FFCCCC",
          purple: "#FBEFFF",
          "purple-more": "#E4CCFF",
          orange: "#FFF8EF",
          "orange-more": "#FFE1CC",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
    boxShadow: {
      sm: "0 0 10px rgba(0, 0, 0, 0.07)",
    },
  },
  plugins: [heroui(), require("tailwindcss-animate")],
};
