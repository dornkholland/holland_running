import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const NavbarNoAuth = ({ setHamburger, setModalIsOpen, setSignupLogin }) => {
  const closeHamburger = () => {
    setHamburger(false);
  };

  const openModal = () => {
    closeHamburger();
    setModalIsOpen(true);
  };

  const handleSignup = () => {
    openModal();
    setSignupLogin("signup");
  };

  const handleLogin = () => {
    openModal();
    setSignupLogin("login");
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
      </li>
    </ul>
  );
};

export default NavbarNoAuth;
