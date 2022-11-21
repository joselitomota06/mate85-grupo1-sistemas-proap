import React, { PropsWithChildren, useCallback, useState } from "react";
import {
  useTheme,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Box,
  Container,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";
import { NavigationItem } from "./NavigationWrapper";
import { MobileNavigationChildren } from "./MobileNavigationWrapper.style";
import { useAppDispatch } from "../../store";
import { logout } from "../../store/slices/auth-slice/authSlice";

interface MobileNavigationWrapperProps extends PropsWithChildren {
  items: NavigationItem[];
}

export const MobileNavigationWrapper = ({
  items,
  children,
}: MobileNavigationWrapperProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleClickNavigation = () => setDrawerOpen(false);

  const handleClickExit = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100vw",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(isDrawerOpen && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                PROAP
              </Typography>
            </Box>
            <IconButton
              color="inherit"
              aria-label="logout"
              onClick={handleClickExit}
              edge="end"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: { width: "60%", maxWidth: "300px" },
          }}
        >
          <List>
            {items.map(({ label, icon, link, visible }) => (
              <React.Fragment key={label}>
                {visible && (
                  <ListItem>
                    <ListItemButton
                      component={NavLink}
                      to={link}
                      onClick={handleClickNavigation}
                    >
                      {icon}
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </AppBar>
      <Toolbar />
      <MobileNavigationChildren>
        <Container maxWidth="xl">{children}</Container>
      </MobileNavigationChildren>
    </div>
  );
};

export default MobileNavigationWrapper;
