// theme.ts

export const theme = {
  colors: {
    primary: {
      main: "#2563EB",   // blue-600
      light: "#3B82F6",  // blue-500
      dark: "#1D4ED8",   // blue-700
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#22C55E",   // green-500 (used in logo)
      light: "#4ADE80",  // green-400
      dark: "#15803D",   // green-700
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff", // page background
      paper: "#F9FAFB",   // gray-50 (cards, inputs)
    },
    text: {
      primary: "#111827",   // gray-900
      secondary: "#6B7280", // gray-500
      disabled: "#9CA3AF",  // gray-400
    },
    border: {
      default: "#E5E7EB", // gray-200
    },
    action: {
      hover: "rgba(37, 99, 235, 0.08)",      // blue hover
      selected: "rgba(37, 99, 235, 0.14)",   // blue selected
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    }
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700, color: "#111827" }, // text-gray-900
    h2: { fontSize: "1.5rem", fontWeight: 600, color: "#111827" },
    h3: { fontSize: "1.25rem", fontWeight: 600, color: "#111827" },
    body1: { fontSize: "1rem", fontWeight: 400, color: "#111827" },
    body2: { fontSize: "0.875rem", fontWeight: 400, color: "#6B7280" }, // gray-500
    button: { textTransform: "none", fontWeight: 500, color: "#fff" },
  },

  components: {
    button: {
      borderRadius: "0.5rem", // rounded-lg
      padding: "8px 16px",
      backgroundColor: "#2563EB", // blue-600
      color: "#ffffff",
      hover: {
        backgroundColor: "#1D4ED8", // blue-700
      }
    },
    input: {
      borderRadius: "0.375rem", // rounded-md
      border: "1px solid #D1D5DB", // gray-300
      backgroundColor: "#F9FAFB",  // gray-50
      color: "#111827",            // gray-900
      placeholderColor: "#6B7280", // gray-500
      focus: {
        borderColor: "#2563EB",   // blue-600
        boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)"
      }
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "0.75rem", // rounded-xl
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)"
    }
  }
};

