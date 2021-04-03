import React from "react";
import video from "./landing.mp4";

const Hero = () => {
  return (
    <div className="hero">
      <video autoPlay muted loop className="hero__video">
        <source src={video} type="video/mp4" />
      </video>
      <div className="hero__cover"></div>
      <div className="hero__content">
        <h1>Running can be tricky.</h1>
        <h2>There's a lot of information out there.</h2>
      </div>
    </div>
  );
};

export default Hero;
