import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavbarNoAuth = ({ setAuthenticated }) => {
  return (
    <ul>
      <li>
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" exact={true} activeClassName="active">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/sign-up" exact={true} activeClassName="active">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default NavbarNoAuth;
