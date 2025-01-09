"use client";

import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const imageGallery = [
  {
    img: "/maps/DeathValley0.85.jpg",
    title: "Death Valley 0.85",
    size: "128 x 128",
    horizontal: 40,
    vertical: 32,
    cross: 0,
    mains: 2,
    numberBases: 13,
    creator: "김응서",
  },
  {
    img: "/maps/DejaVuSE1.95b.jpg",
    title: "Deja Vu SE 1.95b",
    size: "128 x 128",
    horizontal: 21,
    vertical: 21,
    cross: 37,
    mains: 4,
    numberBases: 12,
    creator: "유현상",
  },
  {
    img: "/maps/DominatorSE1.9.jpg",
    title: "Dominator SE 1.9",
    size: "128 x 128",
    horizontal: 35,
    vertical: 35,
    cross: 35,
    mains: 3,
    numberBases: 15,
    creator: "주현서",
  },
  {
    img: "/maps/Eclipse1.3.jpg",
    title: "Eclipse 1.3",
    size: "128 x 112",
    horizontal: 0,
    vertical: 0,
    cross: 34,
    mains: 2,
    numberBases: 11,
    creator: "주현서",
  },
  {
    img: "/maps/Metropolis0.80.jpg",
    title: "Metropolis 0.80",
    size: "128 x 128",
    horizontal: 30,
    vertical: 30,
    cross: 37,
    mains: 4,
    numberBases: 12,
    creator: "김응서",
  },
  {
    img: "/maps/PoleStar0.94.jpg",
    title: "Pole Star 0.94",
    size: "128 x 128",
    horizontal: 29,
    vertical: 29,
    cross: 39,
    mains: 4,
    numberBases: 16,
    creator: "?",
  },
];

const Maps: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    img: string;
    title: string;
    size: string;
    horizontal: number;
    vertical: number;
    cross: number;
    mains: number;
    numberBases: number;
    creator: string;
  } | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;

      switch (event.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "Escape":
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const handleOpen = (item: (typeof imageGallery)[0]) => setSelectedImage(item);
  const handleClose = () => setSelectedImage(null);

  const handleNext = () => {
    if (selectedImage) {
      const currentIndex = imageGallery.findIndex(
        (img) => img.img === selectedImage.img
      );
      const nextIndex = (currentIndex + 1) % imageGallery.length;
      setSelectedImage(imageGallery[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (selectedImage) {
      const currentIndex = imageGallery.findIndex(
        (img) => img.img === selectedImage.img
      );
      const prevIndex =
        (currentIndex - 1 + imageGallery.length) % imageGallery.length;
      setSelectedImage(imageGallery[prevIndex]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginRight: {
          xs: 0,
          md: "0.8rem",
        },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          color: "rgba(243, 244, 246, 0.6)",
          textAlign: "center",
          fontWeight: "bold",
          paddingBottom: "1rem",
        }}
      >
        SSL Spring 2025 Maps
      </Typography>

      {/* Gallery */}
      <ImageList
        cols={isMobile ? 1 : 4}
        gap={8}
        sx={{
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {imageGallery.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => handleOpen(item)}
            sx={{
              cursor: "pointer",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="eager"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth={isMobile}
        sx={{
          "& .MuiDialog-paper": {
            margin: 0,
            width: "100%",
            maxHeight: "100vh",
            flexDirection: isMobile ? "column" : "row",
            overflow: "hidden",
          },
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
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "#1f2937",
              gap: isMobile ? 2 : 4,
              position: "relative",
            }}
          >
            <IconButton
              onClick={handlePrevious}
              sx={{
                position: "absolute",
                top: "50%",
                left: "16px",
                transform: "translateY(-50%)",
                color: "white",
                zIndex: 10,
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <img
              src={selectedImage.img}
              alt="Selected"
              style={{
                maxWidth: "100%",
                maxHeight: "100vh",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                padding: "1rem",
                maxWidth: isMobile ? "100%" : "40%",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              {[
                { label: "Name", value: selectedImage.title },
                { label: "Size", value: selectedImage.size },
                { label: "Mains", value: selectedImage.mains },
                { label: "Bases", value: selectedImage.numberBases },
                {
                  label: "Vertical rush distance",
                  value: selectedImage.vertical,
                },
                {
                  label: "Horizontal rush distance",
                  value: selectedImage.horizontal,
                },
                { label: "Cross rush distance", value: selectedImage.cross },
                { label: "Creator", value: selectedImage.creator },
              ].map((stat, idx) => (
                <DialogContentText
                  key={idx}
                  sx={{
                    textAlign: "left",
                    fontSize: "14px",
                    color: "rgba(243, 244, 246, 0.8)",
                    marginBottom: "0.5rem",
                    wordBreak: "break-word",
                  }}
                >
                  {selectedImage.title === "Death Valley 0.85" &&
                  stat.label === "Vertical rush distance"
                    ? "Top battlefield rush distance: "
                    : selectedImage.title === "Death Valley 0.85" &&
                      stat.label === "Horizontal rush distance"
                    ? "Bottom battlefield rush distance: "
                    : `${stat.label}: `}
                  <span style={{ color: "#10b981", fontWeight: "bold" }}>
                    {stat.value}
                  </span>
                </DialogContentText>
              ))}
            </Box>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                color: "white",
                zIndex: 10,
                backgroundColor: "rgba(0,0,0,0.5)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default Maps;
