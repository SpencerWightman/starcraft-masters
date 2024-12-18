import React from "react";
import { Typography, Box, Grid2 } from "@mui/material";
import Link from "next/link";

const Welcome: React.FC = () => {
  return (
    <Grid2
      container
      spacing={4}
      sx={{
        margin: "1rem",
        marginRight: {
          xs: "1rem",
          md: "2rem",
        },
      }}
    >
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
            borderTop: "2px solid #E49B0F",
            borderRight: "2px solid #E49B0F",
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
              color: "#E49B0F",
            }}
          >
            How to Compete
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • Use the{" "}
            <Link
              href="/draft"
              passHref
              style={{
                textDecoration: "none",
                color: "#10b981",
                fontWeight: "bold",
              }}
            >
              Draft
            </Link>{" "}
            page to select the 15 players who you think will take the most
            combined wins in the next ASL/SSL season.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
            • Follow your team on the{" "}
            <Link
              href="/team"
              passHref
              style={{
                textDecoration: "none",
                color: "#10b981",
                fontWeight: "bold",
              }}
            >
              Results
            </Link>{" "}
            page through each day of the tournament and become the Brood War
            League Champion!
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: "2px solid #9F2B68",
            borderRight: "2px solid #9F2B68",
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
              color: "#9F2B68",
            }}
          >
            Maps
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • An image gallery of the latest ASL/SSL maps along with rush
            distances, number of bases, and number of mains. The previous
            season&apos;s maps are listed until the next season&apos;s maps are
            announced.
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: "2px solid #5F8575",
            borderRight: "2px solid #5F8575",
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
              color: "#5F8575",
            }}
          >
            Charts
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • ASL/SSL analytics. The plan is to create more using
            JackyVSO&apos;s ASL/KSL Database.
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: "2px solid rgba(243, 244, 246, 0.6)",
            borderRight: "2px solid rgba(243, 244, 246, 0.6)",
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
              color: "rgba(243, 244, 246, 0.6)",
            }}
          >
            Contact
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • Lurkerbomb in the{" "}
            <a
              href="https://discord.com/invite/6bh6hhc"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#10b981", textDecoration: "none" }}
            >
              Artosis Discord channel
            </a>
            .
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
            borderTop: "2px solid #90D5FF",
            borderRight: "2px solid #90D5FF",
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
              • The player tiers have progressively increasing selection limits,
              and a minimum selection requirement. However, the minimum
              requirement can be broken by &apos;spending&apos; lower (better
              player) tier slots on higher tier players. That means you can
              select all 15 players from Tier 4 if that&apos;s the team you want
              to draft!
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • ASL/SSL places qualified players in 1 of 4 tiers based on how
              their ASL/SSL performance history ranks against the performance of
              the other qualified players. The players in each tier are then
              divided evenly among the Ro24 groups, so that each group has 1
              player from each tier. Players do not often change tiers from
              season to season.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Brood War League generally follows the offical tiers as of the
              start of the last ASL/SSL season. Seeded players are listed in
              Tier 0. The 15th selection in your team draft is a wildcard
              player, always drawn from Tier 4, who swaps in for any player in
              the 14 who (if any) does not qualify for the Ro24. The wildcard
              player may not qualify either, but it exists as a potential
              backup.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Player statistics on the Team page (except the trophies) start
              at ASL 15 (2023-2025).
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: "2px solid #CC5500",
            borderRight: "2px solid #CC5500",
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
              color: "#CC5500",
            }}
          >
            Thank you
          </Typography>
          <Typography variant="body1" sx={{ marginTop: "1rem" }}>
            • JackyVSO for the{" "}
            <a
              href="https://jackyvso.github.io/Starcraft/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#10b981", textDecoration: "none" }}
            >
              ASL/KSL Database
            </a>{" "}
            used by Brood War League.
          </Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Welcome;
