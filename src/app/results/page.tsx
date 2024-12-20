"use client";

import React from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";

const ro24 = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F"];

const Results = () => {
  return (
    <Box>
      <Typography
        variant="h4"
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
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {ro24.map((entry, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #2d3748",
                "&:last-child": { borderBottom: "none" },
                backgroundColor: index % 2 === 0 ? "#2f3e51" : "#374151",
              }}
            >
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#e5e7eb",
                      }}
                    >
                      {entry}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Results;
