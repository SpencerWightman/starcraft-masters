import React, { useState, useEffect } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { deadlineDate } from "@/constants/constants";
import { Typography, Fade } from "@mui/material";
const countdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  return (
    <Fade in={true} timeout={2000}>
      {completed ? (
        <span>SSL Spring 2025 is underway</span>
      ) : (
        <span>
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
        </span>
      )}
    </Fade>
  );
};

const CountdownWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <Typography
      variant="body1"
      sx={{
        color: "rgba(243, 244, 246, 0.6)",
        textAlign: "left",
        userSelect: "none",
        display: { xs: "none", md: "block" },
      }}
    >
      <Countdown date={deadlineDate} renderer={countdownRenderer} />
    </Typography>
  ) : null;
};

export default CountdownWrapper;
