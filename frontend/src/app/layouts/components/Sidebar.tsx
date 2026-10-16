import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { BookOutlined, BookmarkBorderOutlined } from "@mui/icons-material";

import { NavLink } from "react-router";

export const DRAWER_WIDTH = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    label: "Dictionary",
    path: "/dictionary",
    icon: <BookOutlined />,
  },
  {
    label: "My Words",
    path: "/my-words",
    icon: <BookmarkBorderOutlined />,
  },
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const content = (
    <>
      <Toolbar>
        <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
          VocAbb
        </Typography>
      </Toolbar>

      <Divider />

      <Box sx={{ p: 2 }}>
        <List disablePadding>
          {navigationItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onClose}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                color: "text.secondary",

                "&.active": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",

                  "& .MuiListItemIcon-root": {
                    color: "inherit",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: DRAWER_WIDTH },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
          },
        }}
      >
        {content}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },

          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: 1,
            borderColor: "divider",
          },
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
}
