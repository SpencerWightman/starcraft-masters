"use client";

import React, { useState, useEffect } from "react";
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
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import CountdownWrapper from "@/components/timer/Countdown";
import { mapsNotificationSeason } from "@/constants/constants";
import Welcome from "@/app/welcome/page";
import Link from "next/link";
import { deadlineDate } from "@/constants/constants";

const LayoutUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMapsNew, setIsMapsNew] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!session) return;

    const storedVersion = localStorage.getItem("mapsNotificationSeason");
    if (storedVersion !== mapsNotificationSeason) {
      setIsMapsNew(true);
      localStorage.setItem("mapsNotificationSeason", mapsNotificationSeason);
    }
  }, [session]);

  useEffect(() => {
    if (!session || pathname !== "/maps" || !isMapsNew) return;
    setIsMapsNew(false);
  }, [pathname, isMapsNew, session]);

  const navItems = [
    { text: "Welcome", href: "/welcome" },
    { text: "Ro8", href: "/ro8" },
    { text: "Leaderboard", href: "/leaderboard" },
    { text: "Team", href: "/team" },
    { text: "Draft", href: "/draft" },
    { text: "Maps", href: "/maps", isNew: isMapsNew },
    { text: "Meta", href: "/meta" },
    { text: "VS", href: "/vs" },
    { text: "Charts", href: "/charts" },
    { text: "Profile", href: "/profile" },
  ];

  return (
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/welcome" passHref>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#10b981" }}
            >
              Brood War League
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CountdownWrapper
              deadline={deadlineDate}
              msg={"ASL Spring 2025 is underway"}
              showDays={true}
            />
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
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
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
                  {/* New icon */}
                  {item.isNew && (
                    <NewReleasesIcon
                      sx={{
                        position: "absolute",
                        top: "-2px",
                        right: "-2px",
                        fontSize: "1rem",
                        color: "#f87171",
                      }}
                    />
                  )}
                </Box>
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
                  onClick={() => {
                    setTimeout(() => setIsNavOpen(false), 300);
                  }}
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

      {/* Welcome */}
      <Box
        sx={{
          display: pathname === "/welcome" ? "flex" : "none",
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
          <Welcome />
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: pathname !== "/welcome" ? "flex" : "none",
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
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutUI;
