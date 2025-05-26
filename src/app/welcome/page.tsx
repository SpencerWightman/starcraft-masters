import React from "react";
import { Typography, Box, Grid2 } from "@mui/material";
import Link from "next/link";

const Welcome: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "rgba(243, 244, 246, 0.6)",
          }}
        >
          Congratulations to{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: "bold" }}>
            Lurkerbomb
          </Box>
          ,{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: "bold" }}>
            Mob
          </Box>
          ,{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: "bold" }}>
            zelevin
          </Box>
          ,{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: "bold" }}>
            Fiik
          </Box>
          , and{" "}
          <Box component="span" sx={{ color: "#10b981", fontWeight: "bold" }}>
            nozh
          </Box>{" "}
          for a top 3 finish in the first season of Brood War League!
        </Typography>
      </Box>

      <Grid2
        container
        spacing={{ xs: 0, sm: 4 }}
        sx={{
          margin: "1rem auto",
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
              •{" "}
              <Link
                href="/profile"
                passHref
                style={{
                  textDecoration: "none",
                  color: "#10b981",
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Link>{" "}
              then use the{" "}
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
              combined wins in the next ASL season.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • You have until the first ASL qualifier (approximately when the
              countdown expires) to save your team. One point is awarded for
              each match win starting in the Ro24.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
              • Track your points on the{" "}
              <Link
                href="/leaderboard"
                passHref
                style={{
                  textDecoration: "none",
                  color: "#10b981",
                  fontWeight: "bold",
                }}
              >
                Leaderboard
              </Link>{" "}
              through each day of the tournament and become the Brood War League
              Champion!
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "2px solid #ec7063 ",
              borderRight: "2px solid #ec7063 ",
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
                color: "#ec7063 ",
              }}
            >
              VS
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
              • Compare player win rates by matchup and match duration using
              their aggregate ASL, SSL, and KSL performance.
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "2px solid #bb8fce",
              borderRight: "2px solid #bb8fce",
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
                color: "#bb8fce",
              }}
            >
              Maps
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
              • An image gallery of the most recent ASL maps along with rush
              distances, number of bases, and number of mains.
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "2px solid #7dcea0",
              borderRight: "2px solid #7dcea0",
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
                color: "#7dcea0",
              }}
            >
              Recap
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
              • Charts showing player supplies per second for each ASL 19 match.
              The data can be fuzzy: for example, sometimes an 80 should be a
              90, and the charts do not always track to the very end of the
              match. We are working on improving this.
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "2px solid #a06b3c",
              borderRight: "2px solid #a06b3c",
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
                color: "#a06b3c",
              }}
            >
              Vod
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
              • Experimental feature. Submit the URL of a short YouTube gameplay
              video (Artosis Casts etc.) and receive back AI-generated gameplay
              commentary.
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
              • ASL analytics. The plan is to create more using historical data.
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
                • Each player tier has a selection requirement, enforcing
                selections from all player tiers. You can update your saved team
                by saving a new draft. There is no guarantee that all of the
                players listed will choose to compete in the next ASL.
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                • ASL places qualified players into 1 of 4 tiers based on how
                their performance history ranks against the performance of the
                other qualified players. The players in each tier are then
                divided evenly among the Ro24 groups, so that each group has 1
                player from each tier. Players do not often change tiers from
                season to season. Brood War League generally follows the
                official tiers as of the start of the last season. Seeded
                players are listed in Tier 0.
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                • Player statistics (except trophies) start at ASL 15, February
                2023.
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
            <Typography variant="body1" sx={{ marginTop: "1rem" }}>
              •{" "}
              <a
                href="https://910map.tistory.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#10b981", textDecoration: "none" }}
              >
                910map
              </a>{" "}
              for map information.
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
              • Lurkerbomb on Discord.
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Welcome;
