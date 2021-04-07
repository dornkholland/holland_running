import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { logout } from "../../store/auth";
import { useDispatch } from "react-redux";

const NavbarAuth = ({ setHamburger }) => {
  const dispatch = useDispatch();

  const closeHamburger = () => {
    setHamburger(false);
  };

  const handleLogout = async () => {
    closeHamburger();
    await dispatch(logout());
    Redirect("/");
  };

  return (
    <ul>
      <li>
        <NavLink
          to="/videos/recordings"
          onClick={closeHamburger}
          exact={true}
          activeClassName="active"
        >
          Class Recordings
        </NavLink>
      </li>
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
      <li>
        <button onClick={handleLogout} activeClassName="active">
          Log Out
        </button>
      </li>
    </ul>
  );
};

export default NavbarAuth;
