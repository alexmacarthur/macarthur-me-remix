/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Public Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        "7xl": "6rem",
        yuge: "14vw",
      },
      colors: {
        midGray: "#131B2A",
      },
      zIndex: {
        "-10": "-10",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontWeight: 300,
            a: {
              color: "inherit",
              textDecoration: "none",
              fontWeight: "inherit",
            },
            "h2, h3, h4, h5": {
              color: theme("colors.gray.900"),
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.extrabold"),
              marginBottom: `${theme("margin.5")} !important`,
              lineHeight: theme("lineHeight.tight"),
            },
            h3: {
              fontSize: theme("fontSize.2xl"),
            },
            h4: {
              fontSize: theme("fontSize.xl"),
            },
            h5: {
              fontSize: theme("fontSize.lg"),
            },
            "ul, ol": {
              paddingLeft: theme("padding.4"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.700"),
            },
            "ol > li::before": {
              color: theme("colors.gray.700"),
            },
            li: {
              marginTop: "0 !important",
              marginBottom: "0 !important",
            },
            code: {
              fontWeight: "inherit",
              color: theme("colors.gray.700"),
              borderRadius: theme("border.sm"),
              padding: theme("padding.1"),
              fontFamily: "'Public Sans', sans-serif",
              background: theme("colors.gray.200"),
              fontSize: ".9em !important",
            },
            th: {
              color: theme("colors.gray.700"),
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            "code:not([class])": {
              fontSize: "inherit !important",
            },
            pre: {
              fontSize: theme("fontSize.base"),
            },
            "pre code::after": {
              content: "none",
            },
            ".property-access": {
              color: "white",
            },
            ':not(pre) > code[class*="language-"], pre[class*="language-"]': {
              background: "#1f2937 !important",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: [],
    }),
    require("precss"),
  ],
};
