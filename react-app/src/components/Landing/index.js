import React, { useState } from "react";
import Hero from "./Hero";
import InfoGrid from "./InfoGrid";
import "./Landing.css";

const Landing = () => {
  const [hamburger, setHamburger] = useState(false);

  return (
    <div className="Landing">
      <Hero />
      <InfoGrid />
    </div>
  );
};

export default Landing;
