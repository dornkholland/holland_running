import React from "react";
import video from "./landing2.mp4";

const Hero = () => {
  return (
    <div className="hero">
      <video playsInline muted autoPlay loop className="hero__video">
        <source src={video} type="video/mp4" />
      </video>
      <div className="hero__cover"></div>
      <div className="hero__content">
        <h1>Professional running training</h1>
        <h2>Affordable, online, and tailored to you.</h2>
      </div>
    </div>
  );
};

export default Hero;
