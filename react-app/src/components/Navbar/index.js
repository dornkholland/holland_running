import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const user = useSelector((state) => state.auth.user);

  Modal.setAppElement("#root");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="navbarr">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="Holland Running logo" />
      </Link>
      <button className="navbar__hamburger" onClick={(e) => setHamburger(true)}>
        <i className="fa fa-bars"></i>
      </button>
      <Drawer
        anchor="left"
        open={hamburger}
        onClose={(e) => setHamburger(false)}
        className="navbar__drawer"
      >
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
