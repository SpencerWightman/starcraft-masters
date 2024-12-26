"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import "./global.css";
import CountdownWrapper from "@/components/layout/Countdown";
import Maps from "@/app/maps/page";
import Draft from "@/app/draft/page";
import Link from "next/link";

const queryClient = new QueryClient();

const universalTargetDate = new Date("2025-02-03T23:59:59Z");

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { text: "Welcome", href: "/welcome" },
    { text: "Leaderboard", href: "/leaderboard" },
    { text: "Team", href: "/team" },
    { text: "Draft", href: "/draft" },
    { text: "Maps", href: "/maps" },
    { text: "Charts", href: "/charts" },
    { text: "Profile", href: "/profile" },
  ];

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Box
              sx={{
                minHeight: "100vh",
                minWidth: "100vw",
                backgroundColor: "#1f2937",
                color: "#f3f4f6",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                userSelect: "none",
              }}
            >
              {/* Info Bar */}
              <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
                <Toolbar
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#10b981" }}
                  >
                    Brood War League
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CountdownWrapper targetDate={universalTargetDate} />
                  </Box>
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
                      <Link key={index} href={item.href} passHref>
                        <Button
                          sx={{
                            color: "#10b981",
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": {
                              color: "rgba(16, 185, 129, 0.7)",
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          {item.text}
                        </Button>
                      </Link>
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
                      <Link href={item.href} key={index}>
                        <ListItemButton
                          onClick={() => setIsNavOpen(false)}
                          sx={{
                            color: "#10b981",
                            textDecoration: "none",
                            borderBottom: "1px solid #374151",
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
                      </Link>
                    ))}
                  </List>
                </Box>
              )}

              <Box
                sx={{
                  display: pathname === "/maps" ? "flex" : "none",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <Box
                  sx={{
                    flex: 3,
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                  }}
                >
                  <Maps />
                </Box>
              </Box>

              <Box
                sx={{
                  display: pathname === "/draft" ? "flex" : "none",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "1rem",
                }}
              >
                <Box
                  sx={{
                    flex: 3,
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                  }}
                >
                  <Draft />
                </Box>
              </Box>

              {/* Content */}
              <Box
                sx={{
                  display:
                    pathname !== "/maps" && pathname !== "/draft"
                      ? "flex"
                      : "none",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Box
                  sx={{
                    flex: 3,
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                  }}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
