import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { AppThemeProvider } from "@/app/providers/AppThemeProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { AuthInitializer } from "@/features/auth/components/AuthInitializer";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AuthInitializer>
        <AppThemeProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </AppThemeProvider>
      </AuthInitializer>
    </AuthProvider>
  </StrictMode>,
);
