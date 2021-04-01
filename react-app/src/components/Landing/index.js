import React, { useState } from "react";
import Hero from "./Hero";
import "./Landing.css";

const Landing = () => {
  const [hamburger, setHamburger] = useState(false);

  return (
    <div className="Landing">
      <Hero />
    </div>
  );
};

export default Landing;
