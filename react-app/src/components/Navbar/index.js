import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import NavbarNoAuth from "./NavbarNoAuth";
import NavbarAuth from "./NavbarAuth";
import Modal from "react-modal";
import "./Navbar.css";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import VideoForm from "../vid/VideoForm";
import { useSelector } from "react-redux";
import logo from "./logo.png";
import inlineLogo from "./logo2.png";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const user = useSelector((state) => state.auth.user);

  Modal.setAppElement("#root");

  function closeModal() {
    setModalIsOpen(false);
  }

  function closeHamburger() {
    setHamburger(false);
  }

  return (
    <div className="navbarr">
      <button className="navbar__hamburger" onClick={(e) => setHamburger(true)}>
        <MenuIcon />
      </button>
      <Link to="/" className="navbar__logo">
        <img src={inlineLogo} alt="Holland Running logo" />
      </Link>
      <Drawer
        anchor="left"
        open={hamburger}
        onClose={(e) => setHamburger(false)}
        className="navbar__drawer"
      >
        <nav className="navbar__top">
          <button onClick={closeHamburger}>
            <MenuIcon />
          </button>
          <NavLink to="/">
            <img src={inlineLogo} alt="logo" />
          </NavLink>
        </nav>
        <nav className="navbar__nav">
          {!user ? (
            <NavbarNoAuth
              setHamburger={setHamburger}
              setModalIsOpen={setModalIsOpen}
              setModalType={setModalType}
            />
          ) : (
            <NavbarAuth
              setHamburger={setHamburger}
              setModalIsOpen={setModalIsOpen}
              setModalType={setModalType}
            />
          )}
        </nav>
      </Drawer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <img src={logo} alt="Holland Running logo" />
        <button onClick={closeModal} className="modal--minimize">
          <i className="fa fa-window-minimize"></i>
        </button>
        {modalType === "signup" ? (
          <SignUpForm setModalIsOpen={setModalIsOpen} />
        ) : modalType === "login" ? (
          <LoginForm setModalIsOpen={setModalIsOpen} />
        ) : (
          <VideoForm setModalIsOpen={setModalIsOpen} />
        )}
      </Modal>
    </div>
  );
};

export default Navbar;
