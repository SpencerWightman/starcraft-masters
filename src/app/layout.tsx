"use client";

import React, { useMemo, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Countdown from "react-countdown";
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
import { useRouter, usePathname } from "next/navigation";
import Maps from "./maps/page";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const universalTargetDate = useMemo(
    () => new Date("2025-02-04T23:59:59Z"),
    []
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { text: "Welcome", href: "/welcome" },
    { text: "Results", href: "/results" },
    { text: "Team", href: "/team" },
    { text: "Maps", href: "/maps" },
    { text: "Charts", href: "/charts" },
    { text: "Profile", href: "/profile" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countdown = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Drafting has closed!</span>;
    } else {
      return (
        <span>
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </span>
      );
    }
  };

  return (
    <html lang="en">
      <body>
        <UserProvider>
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
                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(243, 244, 246, 0.6)",
                    textAlign: "left",
                    userSelect: "none",
                  }}
                >
                  ASL/SSL Countdown:{" "}
                  <Countdown date={universalTargetDate} renderer={countdown} />
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
                        color:
                          pathname === item.href
                            ? "rgba(16, 185, 129, 0.7)"
                            : "#10b981",
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

            {/* Content */}
            <Box
              sx={{
                display: pathname !== "/maps" ? "flex" : "none",
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
                {children}
                <SpeedInsights />
              </Box>
            </Box>
          </Box>
        </UserProvider>
      </body>
    </html>
  );
};

export default Layout;
