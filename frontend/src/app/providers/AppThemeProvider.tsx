import type { PropsWithChildren } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { theme } from "@/app/theme/theme";

export function AppThemeProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
