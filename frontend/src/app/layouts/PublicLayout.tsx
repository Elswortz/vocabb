import { Outlet } from "react-router";
import { Box, Container } from "@mui/material";

export function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </Box>
  );
}
