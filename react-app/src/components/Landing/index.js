import React, { useState } from "react";
import Hero from "./Hero";
import "./Landing.css";
import { Drawer } from "@material-ui/core";

const Landing = () => {
  const [hamburger, setHamburger] = useState(false);

  return (
    <div className="Landing">
      <Hero />
      <button onClick={(e) => setHamburger(true)}>Hamburger</button>
      <Drawer
        anchor="left"
        open={hamburger}
        onClose={(e) => setHamburger(false)}
      >
        <h1>stuff</h1>
        <h1>stuff 2</h1>
      </Drawer>
    </div>
  );
};

export default Landing;
