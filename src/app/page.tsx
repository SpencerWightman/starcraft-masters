import React from "react";
import WelcomePage from "@/app/welcome/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brood War League",
  description: "An ASL/SSL fantasy league with player analytics.",
};

const HomePage: React.FC = () => {
  return <WelcomePage />;
};

export default HomePage;
