import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import NavbarNoAuth from "./NavbarNoAuth";
import Modal from "react-modal";
import "./Navbar.css";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [signupLogin, setSignupLogin] = useState("");

  Modal.setAppElement(document.getElementById("root"));

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
    <div className="navbar">
      <button className="navbar__hamburger" onClick={(e) => setHamburger(true)}>
        <i className="fa fa-bars"></i>
      </button>
      <Link to="/landing" className="navbar__logo">
        <img src="logo.png" alt="Holland Running logo" />
      </Link>
      <div></div>
      <Drawer
        anchor="left"
        open={hamburger}
        onClose={(e) => setHamburger(false)}
        className="navbar__drawer"
      >
        <nav className="navbar__nav">
          <NavbarNoAuth
            setHamburger={setHamburger}
            setModalIsOpen={setModalIsOpen}
            setSignupLogin={setSignupLogin}
          />
        </nav>
      </Drawer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal}>
          <i class="fa fa-window-minimize"></i>
        </button>
        {signupLogin === "signup" ? <SignUpForm /> : <LoginForm />}
      </Modal>
    </div>
  );
};

export default Navbar;
