"use client";

import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button, Fade } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { mapsNotificationSeason } from "@/constants/constants";

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    email: string;
  }
}

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [isSignUp, setIsSignUp] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 5 && password.length <= 50;
  };

  const handleSignIn = async () => {
    setError("");

    const { username, password, email } = credentials;

    if (isSignUp) {
      if (!validateUsername(username)) {
        setError(
          "Username must be between 3 and 12 characters. No special characters."
        );
        return;
      }
      if (!validateEmail(email)) {
        setError("Enter a valid email address.");
        return;
      }
    }

    if (!validatePassword(password)) {
      setError("Password must be between 5 and 50 characters.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        username: isSignUp ? username : undefined,
        password,
        email,
        mode: isSignUp ? "signup" : "login",
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error(result?.error || "Authentication failed");
      }

      if (isSignUp) {
        localStorage.setItem("mapsNotificationSeason", mapsNotificationSeason);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error occurred";
      setError(errorMessage);
    }
  };

  return (
    <Fade in={status !== "loading"} timeout={500}>
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
        {status === "unauthenticated" ? (
          <>
            <Typography
              variant="body1"
              sx={{
                marginBottom: 4,
                color: "#ffffff",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              {isSignUp
                ? "Sign up to save your team draft and compete in Brood War League"
                : "Log in to save your team draft and compete in Brood War League"}
            </Typography>
            {error && (
              <Typography
                variant="body2"
                sx={{
                  color: "#10b981",
                  marginBottom: 2,
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            )}
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <TextField
                label="Email"
                name="email"
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    style: { color: "#ffffff" },
                  },
                }}
                sx={{
                  marginBottom: 2,
                }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={handleInputChange}
                fullWidth
                slotProps={{
                  input: {
                    style: { color: "#ffffff" },
                  },
                }}
                sx={{
                  marginBottom: 2,
                  color: "#ffffff",
                }}
              />
              {isSignUp && (
                <TextField
                  label="Username"
                  name="username"
                  onChange={handleInputChange}
                  fullWidth
                  slotProps={{
                    input: {
                      style: { color: "#ffffff" },
                    },
                  }}
                  sx={{
                    marginBottom: 2,
                    color: "#ffffff",
                  }}
                />
              )}
              <Button
                onClick={handleSignIn}
                variant="contained"
                sx={{ backgroundColor: "#10b981", marginBottom: 2 }}
                fullWidth
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </Button>
              <Button
                onClick={() => setIsSignUp((prev) => !prev)}
                variant="text"
                sx={{
                  color: "#ffff",
                  "&:hover": {
                    backgroundColor: "#059669",
                  },
                }}
                fullWidth
              >
                {isSignUp ? "Log In" : "Sign Up"}
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
              Username: {session?.username || "||||||||"}
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
              Email: {session?.email || "No email available"}
            </Typography>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                onClick={() => signOut()}
                variant="contained"
                sx={{ backgroundColor: "#10b981" }}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Fade>
  );
};

export default Profile;
