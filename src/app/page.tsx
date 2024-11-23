"use client";

import React, { useState } from "react";
import { Container, Typography, Button, Modal, Box } from "@mui/material";
import LowBaseChartController from "./charts/lowBaseChartController";

const Home: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container sx={{ padding: 5, textAlign: "center" }}>
      {/* Title */}
      <Typography variant="h1" sx={{ fontWeight: "bold", my: 5 }}>
        Brood War League
      </Typography>

      {/* Navigation */}
      <Modal
        open={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box id="modal-description" sx={{ mt: 2 }}>
            <Button href="/leaderboard" fullWidth sx={{ mb: 1 }}>
              Leaderboard
            </Button>
            <Button href="/players" fullWidth sx={{ mb: 1 }}>
              Players
            </Button>
            <Button href="/sign-in" fullWidth sx={{ mb: 1 }}>
              Sign In
            </Button>
            <Button href="/sign-up" fullWidth sx={{ mb: 1 }}>
              Sign Up
            </Button>
            <Button href="/reset-password" fullWidth>
              Reset Password
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Charts */}
      <LowBaseChartController />
    </Container>
  );
};

export default Home;
