import React, { useState } from "react";
import { Drawer } from "@material-ui/core";
import NavbarNoAuth from "./NavbarNoAuth";
import "./Navbar.css";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);

  return (
    <div className="navbar">
      <button className="navbar__hamburger" onClick={(e) => setHamburger(true)}>
        <i className="fa fa-bars fa-7x"></i>
      </button>
      <Drawer
        anchor="left"
        open={hamburger}
        onClose={(e) => setHamburger(false)}
        className="navbar__drawer"
      >
        <nav className="navbar__nav">
          <NavbarNoAuth />
        </nav>
      </Drawer>
    </div>
  );
};

export default Navbar;
