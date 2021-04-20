import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

const NavbarNoAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
  const dispatch = useDispatch();
  const [demoToggle, setDemoToggle] = useState(false);
  const closeHamburger = () => {
    setHamburger(false);
  };

  const toggleDemo = () => {
    setDemoToggle(!demoToggle);
  };

  const openModal = () => {
    closeHamburger();
    setModalIsOpen(true);
  };

  const handleSignup = () => {
    openModal();
    setModalType("signup");
  };

  const handleLogin = () => {
    openModal();
    setModalType("login");
  };

  const handleDemo = () => {
    closeHamburger();
    dispatch(login("demo@user.com", "password"));
  };

  const handleOwner = () => {
    closeHamburger();
    dispatch(login("demo@owner.com", "password"));
  };

  return (
    <>
      {demoToggle === true ? (
        <ul className="dropdown">
          <li>
            <button onClick={toggleDemo}> &lt;&lt; </button>
          </li>
          <li>
            <button onClick={handleDemo}>Demo User</button>
          </li>

          <li>
            <button onClick={handleOwner}>Demo Owner</button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <NavLink
              to="/"
              onClick={closeHamburger}
              exact={true}
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogin}>Login</button>
          </li>
          <li>
            <button onClick={handleSignup}>Sign Up</button>
          </li>
          <li>
            <button onClick={toggleDemo}>Demo Users {">>"}</button>
          </li>
          <Accordion className="nav__dropdown">
            <AccordionSummary className="dropdown--off">
              <button>Demo Users {">>"}</button>
            </AccordionSummary>
            <AccordionDetails className="dropdown--on">
              <ul className="dropdown">
                <li>
                  <button onClick={handleDemo}>Demo User</button>
                </li>

                <li>
                  <button onClick={handleOwner}>Demo Owner</button>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </ul>
      )}
    </>
  );
};

export default NavbarNoAuth;
