import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeContext";
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <Analytics />
    </ThemeProvider>
  </BrowserRouter>
);