import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppThemeProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AppThemeProvider>
  </StrictMode>,
);
