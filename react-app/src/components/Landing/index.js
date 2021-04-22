import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Hero from "./Hero";
import InfoGrid from "./InfoGrid";
import "./Landing.css";
import { useSelector } from "react-redux";

const Landing = () => {
  const [hamburger, setHamburger] = useState(false);
  const user = useSelector((state) => state.auth.user);
  if (user) return <Redirect to="/videos/runs" />;
  return (
    <div className="Landing">
      <Hero />
      <InfoGrid />
    </div>
  );
};

export default Landing;
