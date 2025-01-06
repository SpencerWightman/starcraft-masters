import React from "react";
import { Paper, Typography } from "@mui/material";

type PlaceholderProps = {
  message: string;
};

export const Placeholder: React.FC<PlaceholderProps> = ({ message }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        maxWidth: 600,
        margin: "auto",
        marginTop: 8,
        backgroundColor: "#374151",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#ffffff",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        {message}
      </Typography>
    </Paper>
  );
};
