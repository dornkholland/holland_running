import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { logout } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";

const NavbarAuth = ({ setHamburger, setModalIsOpen, setModalType }) => {
  const dispatch = useDispatch();

  const closeHamburger = () => {
    setHamburger(false);
  };

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
      {user.role == "owner" ? (
        <li>
          <button onClick={handleModal} activeClassName="active">
            Upload video
          </button>
        </li>
      ) : null}
      <li>
        <button onClick={handleLogout} activeClassName="active">
          Log Out
        </button>
      </li>
    </ul>
  );
};

export default NavbarAuth;
