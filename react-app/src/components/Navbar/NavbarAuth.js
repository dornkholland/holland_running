import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { logout } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

const NavbarAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
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
            margin: 0,
          },
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

  const handleLogout = async () => {
    closeHamburger();
    await dispatch(logout());
    Redirect("/");
  };

  const handleModal = () => {
    closeHamburger();
    setModalIsOpen(true);
    setModalType("upload");
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <ul>
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
                  <VideoLibraryIcon className="nav__icon" />
                  Videos
                </button>
              </AccordionSummary>
            </li>
            <AccordionDetails style={{ margin: 0 }}>
              <ul>
                <li>
                  <NavLink
                    to="/videos/runs"
                    onClick={closeHamburger}
                    exact={true}
                    activeClassName="active"
                  >
                    Full Training Runs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/videos/info"
                    onClick={closeHamburger}
                    exact={true}
                    activeClassName="active"
                  >
                    Informational Content
                  </NavLink>
                </li>
                {user.role == "owner" ? (
                  <li>
                    <button onClick={handleModal}>Upload video</button>
                  </li>
                ) : null}
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>
      </ThemeProvider>
      <li>
        <NavLink
          to="/training"
          onClick={closeHamburger}
          exact={true}
          activeClassName="active"
        >
          <FitnessCenterIcon className="nav__icon" />
          My Training Sessions
        </NavLink>
      </li>
      <li>
        <button onClick={handleLogout}>
          <ExitToAppIcon className="nav__icon" />
          Log Out
        </button>
      </li>
    </ul>
  );
};

export default NavbarAuth;
