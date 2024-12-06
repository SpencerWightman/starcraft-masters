"use client";

import React, { useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const imageGallery = [
  {
    img: "/maps/1.jpg",
    title: "Map 1",
    description: "zzzz",
  },
  {
    img: "/maps/2.jpg",
    title: "Map 2",
    description: "zzzz",
  },
  {
    img: "/maps/3.jpg",
    title: "Map 3",
    description: "zzzz",
  },
  {
    img: "/maps/4.jpg",
    title: "Map 4",
    description: "zzzz",
  },
  {
    img: "/maps/5.jpg",
    title: "Map 5",
    description: "zzzz",
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    img: string;
    description: string;
  } | null>(null);

  const handleOpen = (item: { img: string; description: string }) =>
    setSelectedImage(item);
  const handleClose = () => setSelectedImage(null);

  return (
    <Box sx={{ marginRight: "0.8rem" }}>
      {/* Image Grid */}
      <ImageList cols={4} gap={8}>
        {imageGallery.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => handleOpen(item)}
            sx={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox */}
      <Dialog open={Boolean(selectedImage)} onClose={handleClose} maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <DialogContent
              sx={{
                display: "flex",
                padding: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#1f2937",
              }}
            >
              <img
                src={selectedImage.img}
                alt="Selected"
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                  marginRight: "16px",
                }}
              />
              <DialogContentText
                sx={{
                  textAlign: "left",
                  fontSize: "16px",
                  color: "#ffffff",
                  marginRight: "16px",
                }}
              >
                {selectedImage.description}
              </DialogContentText>
            </DialogContent>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Gallery;
