"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./global.css";
import { useRouter } from "next/navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { text: "Charts", href: "/charts" },
    { text: "Players", href: "/players" },
    { text: "Picks", href: "/picks" },
    { text: "Leaderboard", href: "/leaderboard" },
    { text: "Standings", href: "/standings" },
    { text: "Profile", href: "/profile" },
  ];

  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            minHeight: "100vh",
            minWidth: "100vw" /* Ensure full width */,
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            margin: 0,
            padding: 0,
            overflow: "hidden", // Avoid unintended scrollbars
          }}
        >
          {/* App Bar */}
          <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "#10b981" }}
              >
                Brood War League
              </Typography>

              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setIsNavOpen(!isNavOpen)}
                sx={{
                  fontSize: "1.5rem",
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Desktop Nav */}
              <Box
                component="nav"
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 2,
                }}
              >
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => router.push(item.href)}
                    sx={{
                      color: "#10b981",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        color: "#34d399",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>

          {/* Mobile Nav */}
          {isNavOpen && (
            <Box
              component="nav"
              sx={{
                backgroundColor: "#1f2937",
                padding: "1rem",
                position: "absolute",
                top: 64,
                width: "100%",
                zIndex: 1000,
                display: { xs: "block", md: "none" },
              }}
            >
              <List>
                {navItems.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      setIsNavOpen(false);
                      router.push(item.href);
                    }}
                    sx={{
                      color: "#10b981",
                      textDecoration: "none",
                      "&:hover": { backgroundColor: "#374151" },
                    }}
                  >
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        sx: { fontWeight: "bold", textAlign: "center" },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          )}

          {/* Content Area */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              gap: "1rem",
              padding: "1rem",
            }}
          >
            {/* Main Area for Dynamic Content */}
            <Box
              sx={{
                flex: 3,
                backgroundColor: "transparent",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
};

export default Layout;
