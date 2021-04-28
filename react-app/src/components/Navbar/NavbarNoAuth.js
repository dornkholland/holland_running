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
  ThemeProvider,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";

const NavbarNoAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
  const dispatch = useDispatch();
  const closeHamburger = () => {
    setHamburger(false);
  };

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiAccordion: {
        root: {
          "&::before": {
            backgroundColor: "transparent",
          },
          "&$expanded": {
            margin: 0,
          },
        },
      },
      MuiAccordionSummary: {
        // Name of the rule
        root: {
          height: "30px",
          padding: 0,
          minHeight: "0px",
          "&$expanded": {
            minHeight: "0px",
            backgroundColor: "rgba(0, 0, 0, .1)",
          },
        },
        expanded: {
          // Some CSS
          margin: 0,
        },
        content: {
          "&$expanded": {
            margin: 0,
          },
          margin: 0,
        },
      },
    },
  });

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
          className="nav__element"
        >
          <HomeIcon className="nav__icon" />
          Home
        </NavLink>
      </li>
      <li>
        <button onClick={handleSignup} className="nav__element">
          <EmojiPeopleIcon className="nav__icon" />
          Sign Up
        </button>
      </li>
      <li>
        <button onClick={handleLogin}>
          <PersonIcon className="nav__icon" />
          Login
        </button>
      </li>
      <ThemeProvider theme={theme}>
        <li>
          <Accordion
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "0px solid black",
              padding: 0,
              margin: 0,
            }}
            className={`nav__dropdown`}
          >
            <li>
              <AccordionSummary
                className={`accordion__summary`}
                expandIcon={<i className="fa fa-angle-double-down"></i>}
              >
                <button>
                  <PeopleIcon className="nav__icon" />
                  Demo Users
                </button>
              </AccordionSummary>
            </li>
            <AccordionDetails style={{ margin: 0 }}>
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
        </li>
      </ThemeProvider>
    </ul>
  );
};

export default NavbarNoAuth;
