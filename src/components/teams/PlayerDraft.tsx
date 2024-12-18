"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { PlayerSummary } from "@/app/types/teamTypes";
import RefreshIcon from "@mui/icons-material/Refresh";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMutation } from "@tanstack/react-query";

const saveTeamToDB = async (params: {
  email: string;
  fantasyTeam: string[];
}) => {
  const { email, fantasyTeam } = params;

  const response = await fetch("/api/save-team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      fantasyTeam,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Failed to save team:", {
      status: response.status,
      statusText: response.statusText,
      body: errorDetails,
    });
    throw new Error();
  }
};

const PlayerDraft: React.FC<{
  selectedPlayers: PlayerSummary[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>;
  setTierMaxSlots: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}> = ({ selectedPlayers, setSelectedPlayers, setTierMaxSlots }) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useUser();
  const mutation = useMutation<
    void,
    Error,
    { email: string; fantasyTeam: string[] }
  >({
    mutationFn: saveTeamToDB,
  });

  const [hasSaved, setHasSaved] = useState(false);

  const handleClick = async () => {
    if (isLoading) {
      setSnackbarMessage("Checking login status...");
      setOpen(true);
      return;
    }

    if (!user) {
      setSnackbarMessage("Login to save your team");
      setOpen(true);
      return;
    }

    if (selectedPlayers.length === 15) {
      try {
        const fantasyTeam = selectedPlayers.map(
          (player) => player.player.handle
        );
        console.log(fantasyTeam);
        await mutation.mutateAsync({
          email: user.email as string,
          fantasyTeam,
        });
        localStorage.setItem("FantasyTeam", JSON.stringify(fantasyTeam));
        setSnackbarMessage("Draft saved. View it on the Team page.");
        setHasSaved(true);
      } catch {
        setSnackbarMessage("Failed to save draft. Try again in a moment.");
      }
    } else {
      setSnackbarMessage("Please select 15 players.");
    }
  };

  const handleResetClick = () => {
    setSelectedPlayers([]);
    setTierMaxSlots({
      0: 2,
      1: 5,
      2: 8,
      3: 11,
      4: 15,
    });
    setHasSaved(false);
  };

  const isSaveEnabled = selectedPlayers.length === 15;

  return (
    <Box sx={{ paddingBottom: 2 }}>
      <Grid2
        container
        sx={{
          backgroundColor: "#374151",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#374151",
            borderRadius: "8px",
            textAlign: "left",
            userSelect: "none",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "rgba(243, 244, 246, 0.6)",
                fontSize: 28,
                userSelect: "none",
                lineHeight: 1,
              }}
            >
              Draft
            </Typography>
            <Tooltip
              title={<span style={{ userSelect: "none" }}>Save</span>}
              arrow
              placement="top"
            >
              <IconButton
                size="small"
                onClick={handleClick}
                sx={{
                  color:
                    hasSaved && isSaveEnabled
                      ? "#FFD700"
                      : "rgba(243, 244, 246, 0.6)",
                  userSelect: "none",
                  padding: 0,
                  cursor: "pointer",
                  "&:hover": {
                    color: "#FFD700",
                  },
                }}
              >
                <BeenhereIcon />
              </IconButton>
            </Tooltip>
            <Snackbar
              open={open}
              message={snackbarMessage}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              autoHideDuration={4000}
              onClose={() => setOpen(false)}
            />
            <Tooltip
              title={<span style={{ userSelect: "none" }}>Reset all</span>}
              arrow
              placement="top"
            >
              <IconButton
                size="small"
                onClick={handleResetClick}
                sx={{
                  color: "rgba(243, 244, 246, 0.6)",
                  textAlign: "right",
                  userSelect: "none",
                  padding: 0,
                  cursor: "pointer",
                  "&:hover": {
                    color: "#10b981",
                  },
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            paddingRight: 1,
            paddingLeft: 1,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gridTemplateRows: "auto",
            width: "100%",
            "& > div": {
              minWidth: "76px",
            },
          }}
        >
          {[...Array(15)].map((_, slotIndex) => {
            const player = selectedPlayers[slotIndex];
            return (
              <Box
                key={slotIndex}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#374151",
                  borderRadius: "8px",
                  marginBottom: 2,
                  height: "10px",
                  userSelect: "none",
                }}
              >
                {player ? (
                  <Typography
                    sx={{
                      color: slotIndex === 14 ? "#94A3B8" : "#10b981",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: 20,
                      userSelect: "none",
                    }}
                  >
                    {player.player.handle}
                  </Typography>
                ) : (
                  <Typography
                    sx={{ color: "#94A3B8", fontSize: 16, fontStyle: "italic" }}
                  >
                    ?
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Grid2>
    </Box>
  );
};

export default PlayerDraft;
