import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransactionProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </TransactionProvider>
  </StrictMode>
);
