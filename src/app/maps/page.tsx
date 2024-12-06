"use client";

import React, { useState } from "react";
import { Box, Grid2, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Maps: React.FC = () => {
  const images = ["/maps/1.jpg", "/maps/2.jpg", "/maps/3.jpg"];
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (src: string) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  return (
    <Box>
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        {images.map((src, index) => (
          <Grid2
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
            key={index}
          >
            <Box
              sx={{
                cursor: "pointer",
                borderRadius: 1,
                overflow: "hidden",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => handleOpen(src)}
            >
              <img
                src={src}
                alt={`Map ${index + 1}`}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid2>
        ))}
      </Grid2>

      {/* Lightbox */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "100%",
            maxHeight: "100%",
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected map"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Maps;
