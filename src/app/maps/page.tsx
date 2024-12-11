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
  Theme,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const imageGallery = [
  {
    img: "/maps/1.jpg",
    title: "Deja Vu 1.1",
    horizontal: 31,
    vertical: 31,
    cross: 37,
    mains: 4,
    numberBases: 13,
  },
  {
    img: "/maps/2.jpg",
    title: "Dominator 1.2",
    horizontal: 35,
    vertical: 35,
    cross: 35,
    mains: 3,
    numberBases: 15,
  },
  {
    img: "/maps/3.jpg",
    title: "Kick Back 1.3",
    horizontal: 25,
    vertical: 25,
    cross: 37,
    mains: 4,
    numberBases: 17,
  },
  {
    img: "/maps/4.jpg",
    title: "Minstrel 1.0",
    horizontal: 37,
    vertical: 37,
    cross: 37,
    mains: 2,
    numberBases: 16,
  },
  {
    img: "/maps/5.jpg",
    title: "Monty Hall SE 2.3",
    horizontal: 0,
    vertical: 0,
    cross: 0,
    mains: 2,
    numberBases: 14,
  },
  {
    img: "/maps/6.jpeg",
    title: "Pantheon 1.0",
    horizontal: 30,
    vertical: 30,
    cross: 40,
    mains: 4,
    numberBases: 16,
  },
  {
    img: "/maps/7.jpeg",
    title: "Radeon 1.0",
    horizontal: 31,
    vertical: 32,
    cross: 39,
    mains: 4,
    numberBases: 14,
  },
];

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Gallery />
    </ThemeProvider>
  );
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    img: string;
    title: string;
    horizontal: number;
    vertical: number;
    cross: number;
    mains: number;
    numberBases: number;
  } | null>(null);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

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
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          alignContent: "center",
          alignItems: "center",
          color: "rgba(243, 244, 246, 0.6)",
          marginBottom: "0.5rem",
        }}
      >
        SSL Autumn &apos;24
      </Typography>

      {/* Gallery */}
      <ImageList cols={isMobile ? 1 : 4} gap={8}>
        {imageGallery.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => handleOpen(item)}
            sx={{
              cursor: "pointer",
              width: isMobile ? "100%" : "310px",
              height: isMobile ? "auto" : "310px",
              overflow: "hidden",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <ImageListItemBar title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Lightbox */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={handleClose}
        maxWidth="lg"
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
                  {`${stat.label}: `}
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

export default App;
