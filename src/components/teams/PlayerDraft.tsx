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
import { useSession } from "next-auth/react";
import { deadlineDate } from "@/constants/constants";
import { allocateSlots } from "@/utils/allocateSlots";

class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const saveTeam = async (fantasyTeam: string[]) => {
  const res = await fetch("/api/save-team", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fantasyTeam }),
  });

  if (res.status === 429) {
    throw new ApiError(429, "Too frequent");
  }

  if (!res.ok) {
    throw new ApiError(res.status, "Server error");
  }
};

const PlayerDraft: React.FC<{
  selectedPlayers: PlayerSummary[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<PlayerSummary[]>>;
}> = ({ selectedPlayers, setSelectedPlayers }) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const [isSaving, setIsSaving] = useState(false);

  const [hasSaved, setHasSaved] = useState(false);

  const handleClick = async () => {
    if (deadlineDate <= new Date()) {
      setSnackbarMessage("The drafting deadline has passed for this season");
      setOpen(true);
      return;
    }

    if (status === "unauthenticated") {
      setSnackbarMessage("Login to save your team");
      setOpen(true);
      return;
    }

    const fantasyTeam = selectedPlayers.map((player) => player.player.handle);
    if (selectedPlayers.length === 15) {
      try {
        setIsSaving(true);
        await saveTeam(fantasyTeam);
        setSnackbarMessage(
          "Team saved. It will appear on the leaderboard in a few seconds."
        );
        setHasSaved(true);
      } catch (e) {
        const err = e as ApiError;
        if (err.status === 429) {
          setSnackbarMessage(
            "You can update your roster again in a few seconds."
          );
        } else {
          setSnackbarMessage("Failed to save team. Try again in a moment.");
        }
      } finally {
        setIsSaving(false);
        setOpen(true);
      }
    } else {
      setSnackbarMessage("Please select 15 players");
      setOpen(true);
    }
  };

  const handleResetClick = () => {
    setSelectedPlayers([]);
    setHasSaved(false);
  };

  const { ok: draftIsLegal } = allocateSlots(selectedPlayers);
  const isSaveEnabled = draftIsLegal && selectedPlayers.length === 15;

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
                disabled={isSaving || !isSaveEnabled}
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
              autoHideDuration={8000}
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
                      color: "#10b981",
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
