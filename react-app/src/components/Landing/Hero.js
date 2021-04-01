import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <video autoPlay muted loop className="hero__video">
        <source src="landing.mp4" type="video/mp4" />
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
