// theme.ts
// Centralized theme configuration (green theme)

export const theme = {
  colors: {
    primary: {
      main: "#2E7D32",   // rich green
      light: "#4CAF50",  // medium green
      dark: "#1B5E20",   // deep forest green
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#81C784",   // soft green accent
      light: "#A5D6A7",
      dark: "#388E3C",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F1F8F6",   // very light green-gray background
      paper: "#ffffff",     // cards / forms
    },
    text: {
      primary: "#1B1B1B",   // almost black
      secondary: "#4E4E4E", // gray text
      disabled: "#9E9E9E",
    },
    action: {
      hover: "rgba(46, 125, 50, 0.08)",
      selected: "rgba(46, 125, 50, 0.14)",
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    }
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontSize: "2.5rem", fontWeight: 700, color: "#2E7D32" },
    h2: { fontSize: "2rem", fontWeight: 600, color: "#2E7D32" },
    h3: { fontSize: "1.5rem", fontWeight: 600, color: "#2E7D32" },
    body1: { fontSize: "1rem", fontWeight: 400, color: "#1B1B1B" },
    body2: { fontSize: "0.9rem", fontWeight: 400, color: "#4E4E4E" },
    button: { textTransform: "none", fontWeight: 500, color: "#fff" },
  },

  components: {
    button: {
      borderRadius: "30px",
      padding: "10px 20px",
      backgroundColor: "#2E7D32",
      color: "#ffffff",
      hover: {
        backgroundColor: "#1B5E20"
      }
    },
    input: {
      borderRadius: "30px",
      border: "1px solid #A5D6A7",
      backgroundColor: "#F1F8F6",
      color: "#1B1B1B",
      placeholderColor: "#777",
      focus: {
        borderColor: "#2E7D32",
        boxShadow: "0 0 0 2px rgba(46, 125, 50, 0.2)"
      }
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
    }
  }
};
