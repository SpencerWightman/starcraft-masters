/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { Typography, Fade } from "@mui/material";

interface CountdownWrapperProps {
  deadline: Date | number | string;
  msg: string;
}

const countdownRenderer =
  (msg: string) =>
  ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    return (
      <Fade in={true} timeout={2000}>
        {completed ? (
          <span>{msg}</span>
        ) : (
          <span>
            {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
          </span>
        )}
      </Fade>
    );
  };

const CountdownWrapper: React.FC<CountdownWrapperProps> = ({
  deadline,
  msg,
}) => {
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
      <Countdown date={deadline} renderer={countdownRenderer(msg)} />
    </Typography>
  ) : null;
};

export default CountdownWrapper;
