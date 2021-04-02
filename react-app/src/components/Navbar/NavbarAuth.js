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
          to="/"
          onClick={closeHamburger}
          exact={true}
          activeClassName="active"
        >
          Home
        </NavLink>
      </li>
      <li>
        <button
          to="/"
          onClick={handleLogout}
          exact={true}
          activeClassName="active"
        >
          Log Out
        </button>
      </li>
      {/*      <li>
        <button
          to="/login"
          onClick={handleLogin}
          exact={true}
          activeClassName="active"
        >
          Login
        </button>
      </li>
      <li>
        <button
          to="/sign-up"
          onClick={handleSignup}
          exact={true}
          activeClassName="active"
        >
          Sign Up
        </button>
      </li> */}
    </ul>
  );
};

export default NavbarAuth;
