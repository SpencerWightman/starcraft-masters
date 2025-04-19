"use client";

import { Button } from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
  audioUrl: string;
}

const Waveform: React.FC<WaveformProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#a0d8ef",
      progressColor: "#1e88e5",
      height: 80,
      backend: "MediaElement",
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on("ready", () => {
      setIsReady(true);
      setIsPlaying(false);
    });

    wavesurferRef.current.on("error", (err) => {
      console.error("WaveSurfer error:", err);
      setIsReady(false);
    });

    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
    setIsPlaying(wavesurferRef.current.isPlaying());
  };

  return (
    <div>
      <div ref={waveformRef} style={{ width: "100%", minWidth: "300px" }} />
      {isReady && (
        <Button
          onClick={togglePlay}
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: "#10b981" }}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
      )}
    </div>
  );
};

export default Waveform;
