import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";

const NavbarNoAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
  const dispatch = useDispatch();
  const closeHamburger = () => {
    setHamburger(false);
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
        <button onClick={handleDemo} activeClassName="active">
          Demo User
        </button>
      </li>

      <li>
        <button onClick={handleOwner} activeClassName="active">
          Demo Owner
        </button>
      </li>
    </ul>
  );
};

export default NavbarNoAuth;
