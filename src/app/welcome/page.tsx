"use client";

import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid2 } from "@mui/material";

const Welcome: React.FC = () => {
  return (
    <Grid2 container spacing={4}>
      {/* Left Column */}
      <Grid2
        size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            border: "2px solid #10b981",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#10b981",
            }}
          >
            How to Compete
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • Use the Team page to select the 15 players who you think will take
            the most combined wins in the next ASL/SSL season
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
            • Follow your team on the Results page through each day of the
            tournament and become the Brood War League Champion!
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid #10b981",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#10b981",
            }}
          >
            Maps
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • zzzzzz
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
            • zzzzzz
          </Typography>
        </Box>
        <Box
          sx={{
            border: "2px solid #10b981",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#10b981",
            }}
          >
            Charts
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • zzzzzz
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
            • zzzzzz
          </Typography>
        </Box>
      </Grid2>

      {/* Right Column */}
      <Grid2
        size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            border: "2px solid #90D5FF",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#90D5FF",
            }}
          >
            Drafting Guide
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "1rem",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Follow your team on the Results page
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • The player draft tiers have progressively increasing selection
              limits, and a minimum selection requirement. However, the minimum
              requirement can be broken by 'spending' lower (better player) tier
              slots in higher tiers. That means that you can select all 15
              players from Tier 4 if that's the team you want to draft!
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Players who qualify for the ASL/SSL are split into tiers 1
              through 4 based on how their ASL/SSL performance history ranks
              against the performance of the other qualified players. The
              players in each tier are then divided evenly among the Ro24
              groups, so that each group has 1 player from each tier. Players do
              not often change tiers.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Brood War League follows the offical tiers as of the start of
              the last ASL/SSL season (except for 2 differences that I'll leave
              for you to spot). Seeded players are listed in Tier 0. The 15th
              selection in your team draft is a wildcard player, always drawn
              from Tier 4, who will swap with any player in the 14 who (if any)
              does not qualify for the Ro24. Of course, the wildcard player may
              not qualify either, but it exists as a potential backup.
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Welcome;
