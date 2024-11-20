// HomePage.tsx
"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
} from "@mui/material";
import LowBaseWinLossChart from "./charts/lowBaseWinLossResults";
import MatchLengthChart from "./charts/matchLengthResults";

const Home: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Sample data for the leaderboard
  const leaderboardData = [
    { rank: 1, name: "Player1", points: 1500 },
    { rank: 2, name: "Player2", points: 1450 },
    { rank: 3, name: "Player3", points: 1400 },
    // Add more entries up to top 20...
  ];

  // Inline styles or constants for styling
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
      {/* Site Title */}
      <Typography variant="h1" sx={{ fontWeight: "bold", my: 5 }}>
        Brood War League
      </Typography>

      {/* Hamburger Menu Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsNavOpen(true)}
        sx={{ fontSize: "24px", padding: "10px" }}
      >
        ☰
      </Button>

      {/* Modal for Navigation */}
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

      {/* Leaderboard Table */}
      <TableContainer component={Paper} sx={{ marginTop: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player Name</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardData.map((player) => (
              <TableRow key={player.rank}>
                <TableCell>{player.rank}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Chart Section */}
      <LowBaseWinLossChart />
      <MatchLengthChart />
    </Container>
  );
};

export default Home;
