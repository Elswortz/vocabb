import { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AccountCircleOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "@/features/auth/hooks/useAuth";

import { useLogoutMutation } from "@/features/auth/api/auth.queries";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dictionary": "Dictionary",
  "/my-words": "My Words",
};

export function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null);

  const logoutMutation = useLogoutMutation();

  const title = pageTitles[pathname] ?? "VocAbb";
  const accountMenuOpen = Boolean(accountAnchor);

  const handleAccountOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchor(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchor(null);
  };

  const handleLogout = async () => {
    handleAccountClose();

    try {
      await logoutMutation.mutateAsync();
    } finally {
      navigate("/", { replace: true });
    }
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={onMenuClick}
          aria-label="Open navigation"
          sx={{
            mr: 2,
            display: { md: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <IconButton
          aria-label="Account menu"
          aria-controls={accountMenuOpen ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={accountMenuOpen ? "true" : undefined}
          onClick={handleAccountOpen}
        >
          <AccountCircleOutlined />
        </IconButton>

        <Menu
          id="account-menu"
          anchorEl={accountAnchor}
          open={accountMenuOpen}
          onClose={handleAccountClose}
        >
          <Box sx={{ px: 2, py: 1.5, minWidth: 220 }}>
            <Typography variant="body2" color="text.secondary">
              Signed in as
            </Typography>
            <Typography
              variant="body2"
              sx={{ overflowWrap: "anywhere", mt: 0.5, fontWeight: 600 }}
            >
              {user?.email ?? "Unknown user"}
            </Typography>
          </Box>

          <Divider />

          <MenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {logoutMutation.isPending ? "Signing out..." : "Sign out"}
            </ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
