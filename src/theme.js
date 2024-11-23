import { createTheme } from "@mui/material/styles";

// Define the custom theme
const theme = createTheme({
  palette: {
    background: {
      default: "#1F1B24", // Primary background for chat area
    },
    sidebar: {
      main: "#2C2A33", // Sidebar background
    },
    accent: {
      main: "#4A90E2", // Accent color for buttons and highlights
    },
    outgoingMessage: {
      main: "#5CACE4", // Outgoing message bubble
    },
    incomingMessage: {
      main: "#3E3A44", // Incoming message bubble
    },
    text: {
      primary: "#FFFFFF", // Main text color
      secondary: "#BBBBBB", // Secondary text (timestamps)
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default theme;
