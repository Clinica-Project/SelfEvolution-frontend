/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: "#6B4E91",
            dark: "#563D78",
            light: "#8B6BB5",
          },
          secondary: "#6297F5",
          accent: {
            yellow: "#F4CC47",
            blue: "#82C4FF",
            teal: "#5BBFB5",
            coral: "#E8716D",
          },
        },
        surface: {
          background: "#FDFBF2",
          card: "#FFFFFF",
          muted: "#F5F2EA",
        },
        content: {
          primary: "#333333",
          secondary: "#4A4A4A",
          muted: "#7A7A7A",
          inverse: "#FFFFFF",
        },
        presence: {
          bg: "#FAF8F5",
          text: "#2B2A28",
          brand: "#5B4B8A",
          gold: "#8A7B5C",
          muted: "#6B6862",
        },
        border: {
          DEFAULT: "#E8E4DA",
          focus: "#6B4E91",
        },
        status: {
          success: "#4CAF50",
          warning: "#F4CC47",
          error: "#D32F2F",
          info: "#6297F5",
        },
      },
      fontFamily: {
        display: ["var(--font-nunito)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        "display-hero": ["clamp(2.5rem, 7vw, 5.5rem)", { lineHeight: "1.03", letterSpacing: "-0.03em" }],
        "display-section": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "body-hero": ["clamp(1.0625rem, 1.4vw, 1.25rem)", { lineHeight: "1.65" }],
        "page-title": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        metric: ["clamp(2.25rem, 4vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(107,78,145,0.08)",
        md: "0 4px 12px rgba(107,78,145,0.12)",
        lift: "0 16px 44px -12px rgba(107,78,145,0.22)",
        glow: "0 0 0 1px rgba(139,107,181,0.35), 0 18px 48px -16px rgba(107,78,145,0.28)",
        header: "0 1px 0 rgba(232,228,218,0.9), 0 8px 32px -20px rgba(107,78,145,0.25)",
        "card-hover": "0 24px 60px -16px rgba(107,78,145,0.18), 0 4px 16px -8px rgba(107,78,145,0.1)",
        "inset-border": "inset 0 0 0 1px rgba(232,228,218,0.9)",
      },
      spacing: {
        page: "24px",
        section: "48px",
      },
      screens: {
        lg: "1024px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "float-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(14px, -22px, 0) scale(1.05)" },
        },
        "float-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-18px, 16px, 0) scale(0.96)" },
        },
        "float-c": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(10px, 24px, 0) scale(1.07)" },
        },
        marquee: {
          from: { transform: "translate3d(0, 0, 0)" },
          to: { transform: "translate3d(-50%, 0, 0)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.45" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "hero-progress": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "icon-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
        },
        "icon-wave": {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
        "mesh-drift": {
          "0%, 100%": { backgroundPosition: "0% 0%, 100% 20%, 40% 100%, 0% 80%" },
          "50%": { backgroundPosition: "30% 40%, 60% 0%, 80% 50%, 20% 30%" },
        },
        "ripple-out": {
          from: { transform: "scale(0)", opacity: "0.55" },
          to: { transform: "scale(18)", opacity: "0" },
        },
      },
      animation: {
        "float-a": "float-a 22s ease-in-out infinite",
        "float-b": "float-b 28s ease-in-out infinite",
        "float-c": "float-c 34s ease-in-out infinite",
        marquee: "marquee 48s linear infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "hero-progress": "hero-progress 6.5s linear forwards",
        "icon-pulse": "icon-pulse 1.35s ease-in-out infinite",
        "icon-wave": "icon-wave 0.9s ease-in-out infinite",
        "mesh-drift": "mesh-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
