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

const PlayerDraft: React.FC<{
  selectedPlayers: PlayerSummary[];
  wildCardPlayer: PlayerSummary;
}> = ({ selectedPlayers, wildCardPlayer }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000); // Auto-hide after 2 seconds
  };

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
              Team
            </Typography>
            <Tooltip
              title={<span style={{ userSelect: "none" }}>Save</span>}
              arrow
            >
              <IconButton
                size="small"
                onClick={handleClick}
                sx={{
                  color: "rgba(243, 244, 246, 0.6)",
                  fontSize: 14,
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
              message="Saved"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
            <Tooltip
              title={<span style={{ userSelect: "none" }}>Reset all</span>}
              arrow
            >
              <IconButton
                size="small"
                sx={{
                  color: "rgba(243, 244, 246, 0.6)",
                  fontSize: 14,
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
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gridTemplateRows: "auto",
            width: "100%",
            "& > div": {
              minWidth: "75px",
            },
          }}
        >
          {[...Array(14)].map((_, slotIndex) => {
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
                      color: "#f3f4f6",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    {player.player.handle}
                  </Typography>
                ) : (
                  <Typography sx={{ color: "#94A3B8", fontStyle: "italic" }}>
                    ?
                  </Typography>
                )}
              </Box>
            );
          })}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#374151",
              borderRadius: "8px",
              height: "10px",
              userSelect: "none",
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{ color: "#000000", fontStyle: "italic", userSelect: "none" }}
            >
              ?
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Box>
  );
};

export default PlayerDraft;
