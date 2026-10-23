import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function GuestRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dictionary" replace />;
  }

  return <Outlet />;
}
