import React, { useState, useEffect } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { Typography } from "@mui/material";
const countdownRenderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    return <span>Drafting has closed!</span>;
  } else {
    return (
      <span>
        {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </span>
    );
  }
};

const CountdownWrapper = ({ targetDate }: { targetDate: Date }) => {
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
      SSL Countdown:{" "}
      <Countdown date={targetDate} renderer={countdownRenderer} />{" "}
    </Typography>
  ) : null;
};

export default CountdownWrapper;
