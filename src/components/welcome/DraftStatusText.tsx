"use client";

import React from "react";
import { deadlineDate } from "@/constants/constants";

const DraftStatusText: React.FC = () => {
  const isDraftOpen = new Date() < deadlineDate;

  return <>ASL 21 drafting is now {isDraftOpen ? "open" : "closed"}</>;
};

export default DraftStatusText;
