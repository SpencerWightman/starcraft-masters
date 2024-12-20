"use client";

import React from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const rounds = {
  "Round of 24": {
    "Group A": ["", "", "", "", ""],
    "Group B": ["", "", "", "", ""],
    "Group C": ["", "", "", "", ""],
    "Group D": ["", "", "", "", ""],
    "Group E": ["", "", "", "", ""],
    "Group F": ["", "", "", "", ""],
  },
  "Round of 16": {
    "Group A": ["", "", "", "", "", "", "", "", "", "", ""],
    "Group B": ["", "", "", "", "", "", "", "", "", "", ""],
    "Group C": ["", "", "", "", "", "", "", "", "", "", ""],
    "Group D": ["", "", "", "", "", "", "", "", "", "", ""],
  },
  "Round of 8": {
    "Match 1": ["", "", "", "", "", "", ""],
    "Match 2": ["", "", "", "", "", "", ""],
    "Match 3": ["", "", "", "", "", "", ""],
    "Match 4": ["", "", "", "", "", "", ""],
  },
  Semifinal: {
    "Match 1": ["", "", "", "", "", "", ""],
    "Match 2": ["", "", "", "", "", "", ""],
  },
  Final: {
    "Match 1": ["", "", "", "", "", "", ""],
  },
};

const Results = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: "rgba(243, 244, 246, 0.6)",
          textAlign: "center",
          fontWeight: "bold",
          padding: "1rem",
        }}
      >
        SSL Spring 2025 Results
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {Object.entries(rounds).map(([roundName, groups]) => (
          <Box key={roundName} sx={{ marginBottom: "2rem", width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                color: "#f9fafb",
                textAlign: "left",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {roundName}
            </Typography>

            <List
              sx={{
                width: "100%",
                maxWidth: "1000px",
                margin: "0 auto",
                backgroundColor: "#1e293b",
                borderRadius: "8px",
              }}
            >
              {Object.entries(groups).map(([groupName, matches]) => (
                <Box key={groupName} sx={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#d1d5db",
                      marginBottom: "0.5rem",
                      paddingLeft: "1rem",
                    }}
                  >
                    {groupName}
                  </Typography>
                  {matches.map((match, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        borderBottom: "1px solid #2d3748",
                        "&:last-child": { borderBottom: "none" },
                        backgroundColor:
                          index % 2 === 0 ? "#2f3e51" : "#374151",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#e5e7eb",
                              fontStyle: "normal",
                            }}
                          >
                            {match === "" ? "? vs. ?" : match}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </Box>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Results;
