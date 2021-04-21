import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createMuiTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const NavbarNoAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
  const dispatch = useDispatch();
  const closeHamburger = () => {
    setHamburger(false);
  };

  const useStyles = makeStyles({
    hideBorder: {
      "&.MuiAccordion-root:before": {
        backgroundColor: "transparent",
      },
    },
    summary: {
      "&.MuiAccordionSummary-root": {
        padding: 0,
      },
    },
  });

  const classes = useStyles();

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
      <Accordion
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "0px solid black",
          padding: 0,
        }}
        className={`nav__dropdown ${classes.hideBorder}`}
      >
        <li>
          <AccordionSummary className={classes.summary}>
            <button>Demo Users {">>"}</button>
          </AccordionSummary>
        </li>
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
  );
};

export default NavbarNoAuth;
