"use client";

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const Profile: React.FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "rgba(243, 244, 246, 0.6)", fontWeight: "bold" }}
        >
          Loading...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          margin: "auto",
          marginTop: 4,
          backgroundColor: "#374151",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
          Error: {error.message}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        marginTop: 4,
        backgroundColor: "#374151",
        borderRadius: 2,
      }}
    >
      {!user ? (
        <>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "rgba(243, 244, 246, 0.6)",
              marginBottom: 2,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Welcome
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              color: "#6b7280",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Please log in to access your profile and other features.
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <a
              href="/api/auth/login"
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "#fff",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </a>
          </Box>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: "rgba(243, 244, 246, 0.6)",
              marginBottom: 2,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Welcome, {user.name || "User"}!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              color: "#6b7280",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            Email: {user.email || "No email available"}
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Link href="/api/auth/login" passHref>
              <Typography
                component="span"
                sx={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#10b981",
                  color: "#fff",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Login
              </Typography>
            </Link>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Profile;
