import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const Results: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "auto",
        marginTop: 4,
        backgroundColor: "#374151",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "rgba(243, 244, 246, 0.6)",
          marginBottom: 2,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Welcome
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          color: "#6b7280",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{
            color: "#9ca3af",
            fontStyle: "italic",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet.
        </Typography>
      </Box>
    </Paper>
  );
};

export default Results;
