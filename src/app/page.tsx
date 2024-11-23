"use client";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
import LowBaseCharts from "./charts/lowBaseCharts";

const Home: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    { text: "Charts", href: "/charts" },
    { text: "Picks", href: "/picks" },
    { text: "Players", href: "/players" },
    { text: "Leaderboard", href: "/leaderboard" },
    { text: "Standings", href: "/standings" },
    { text: "Profile", href: "/profile" },
  ];

  const leaderboardData = [
    { user: "Test", rating: "111.29" },
    { user: "Test", rating: "111.29" },
    { user: "Test", rating: "111.29" },
    { user: "Test", rating: "111.29" },
    { user: "Test", rating: "111.29" },
  ];

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#1f2937",
          color: "#f3f4f6",
        }}
      >
        {/* Desktop nav */}
        <AppBar position="static" sx={{ backgroundColor: "#111827" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#10b981" }}
            >
              Brood War League
            </Typography>

            {/* Hamburger */}
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
                  component={Link}
                  to={item.href}
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
              top: 64, // app bar height
              width: "100%",
              zIndex: 1000,
              display: { xs: "block", md: "none" },
            }}
          >
            <List>
              {navItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  component={Link}
                  to={item.href}
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
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {/* Main */}
          <Box
            sx={{
              flex: 3,
              backgroundColor: "transparent",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <Routes>
              <Route
                path="/charts"
                element={
                  <Box>
                    <Typography variant="h6" sx={{ color: "#fbbf24" }}>
                      Charts
                    </Typography>
                    <LowBaseCharts />
                  </Box>
                }
              />
              <Route
                path="/"
                element={
                  <Typography variant="h6" sx={{ color: "#fbbf24" }}>
                    Main
                  </Typography>
                }
              />
            </Routes>
          </Box>

          {/* Leaderboard */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "#fbbf24", marginBottom: "1rem" }}
            >
              Top 10 Leaderboard
            </Typography>
            {leaderboardData.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #374151",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>
                  {entry.user}
                </Typography>
                <Typography sx={{ color: "#fbbf24" }}>
                  {entry.rating}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default Home;
