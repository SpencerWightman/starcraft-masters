"use client";

import React, { useState } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    email: string;
  }
}

const Profile: React.FC = () => {
  const { data: session, status } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const validateUsername = (username: string): boolean => {
    return username.length >= 3 && username.length <= 14;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 5 && password.length <= 50;
  };

  const handleSignIn = async () => {
    const { username, password, email } = credentials;

    if (isSignUp) {
      if (!validateUsername(username)) {
        alert("Username must be between 3 and 14 characters.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    if (!validatePassword(password)) {
      alert("Password must be between 5 and 50 characters.");
      return;
    }

    await signIn("credentials", {
      username: isSignUp ? username : undefined,
      password,
      email,
    });
  };

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
      {!session ? (
        <>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              color: "#ffffff",
              lineHeight: 1.6,
              textAlign: "center",
            }}
          >
            {isSignUp
              ? "Sign up to save your team draft and compete in Brood War League"
              : "Log in to save your team draft and compete in Brood War League"}
          </Typography>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <TextField
              label="Email"
              name="email"
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            {isSignUp && (
              <TextField
                label="Username"
                name="username"
                onChange={handleInputChange}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            )}
            <Button
              onClick={handleSignIn}
              variant="contained"
              sx={{ backgroundColor: "#10b981" }}
              fullWidth
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
            <Button
              onClick={() => setIsSignUp((prev) => !prev)}
              variant="text"
              sx={{ color: "#ffff" }}
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
  );
};

export default Profile;
