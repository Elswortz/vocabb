import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router";

import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { useRegisterMutation } from "@/features/auth/api/auth.queries";

import { getAuthErrorMessage } from "@/features/auth/utils/getAuthErrorMessage";

export function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const registerMutation = useRegisterMutation();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    try {
      const response = await registerMutation.mutateAsync(values);

      if (response.session) {
        navigate("/dictionary", { replace: true });
      } else {
        setServerError(
          "Registration successful. Please check your email to confirm your account.",
        );
      }
    } catch (error) {
      setServerError(
        getAuthErrorMessage(
          error,
          "Unable to create your account. Please try again.",
        ),
      );
    }
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 440, mx: "auto", py: 6, px: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Create an account
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Sign up to start building your vocabulary.
          </Typography>
        </Box>

        {serverError && (
          <Alert severity={registerMutation.isSuccess ? "info" : "error"}>
            {serverError}
          </Alert>
        )}

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
              label="Username"
              autoComplete="username"
              fullWidth
              {...register("username")}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />

            <TextField
              label="Display name"
              autoComplete="name"
              fullWidth
              {...register("display_name")}
              error={Boolean(errors.display_name)}
              helperText={errors.display_name?.message}
            />

            <TextField
              label="Password"
              type="password"
              autoComplete="new-password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={registerMutation.isPending}
              fullWidth
            >
              {registerMutation.isPending
                ? "Creating account..."
                : "Create account"}
            </Button>

            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none" }}
              >
                Sign in
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
