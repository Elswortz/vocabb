import { Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

export function NotFoundPage() {
  return (
    <Stack spacing={2} sx={{ alignItems: "center", py: 8 }}>
      <Typography variant="h2">404</Typography>

      <Typography color="text.secondary">Page not found</Typography>

      <Button component={RouterLink} to="/" variant="contained">
        Go Home
      </Button>
    </Stack>
  );
}
