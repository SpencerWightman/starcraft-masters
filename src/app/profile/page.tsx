"use client";

import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

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
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/auth/login")}
              sx={{
                textTransform: "none",
                backgroundColor: "#10b981",
                "&:hover": { backgroundColor: "#059669" },
              }}
            >
              Login
            </Button>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/auth/logout")}
              sx={{
                textTransform: "none",
                borderColor: "#f87171",
                color: "#f87171",
                "&:hover": {
                  backgroundColor: "#7f1d1d",
                  color: "#fff",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Profile;
