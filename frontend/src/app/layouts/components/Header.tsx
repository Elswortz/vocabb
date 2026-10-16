import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, AccountCircleOutlined } from "@mui/icons-material";
import { useLocation } from "react-router";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dictionary": "Dictionary",
  "/my-words": "My Words",
};

export function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? "VocAbb";

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

        <IconButton aria-label="Account">
          <AccountCircleOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
