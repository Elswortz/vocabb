import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router";

import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { useLoginMutation } from "@/features/auth/api/auth.queries";

import { getAuthErrorMessage } from "@/features/auth/utils/getAuthErrorMessage";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dictionary";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const loginMutation = useLoginMutation();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    try {
      const response = await loginMutation.mutateAsync(values);

      if (response.session) {
        navigate(from, { replace: true });
      } else {
        setServerError(
          "No active session was returned. Please try signing in again.",
        );
      }
    } catch (error) {
      setServerError(
        getAuthErrorMessage(
          error,
          "Unable to sign in. Please check your credentials and try again.",
        ),
      );
    }
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 440, mx: "auto", py: 6, px: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Welcome back
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Sign in to continue learning vocabulary.
          </Typography>
        </Box>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              autoComplete="email"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loginMutation.isPending}
              fullWidth
            >
              {loginMutation.isPending ? "Signing in..." : "Sign in"}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={{ textTransform: "none" }}
              >
                Sign up
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
