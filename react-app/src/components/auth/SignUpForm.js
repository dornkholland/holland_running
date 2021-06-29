import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/auth";
import { useDispatch } from "react-redux";

const SignUpForm = ({ setModalIsOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await dispatch(signup(firstName, lastName, email, password));
      if (!user.errors) {
        //setAuthenticated(true);
        setModalIsOpen(false);
      }
      setErrors(user.errors);
    } else {
      setErrors(["passwords don't match, try again!"]);
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form onSubmit={onSignUp}>
      <ul className="errors">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
      <div className="form__element">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
          required={true}
        ></input>
      </div>
      <div className="form__element">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={updateLastName}
          value={lastName}
          required={true}
        ></input>
      </div>
      <div className="form__element">
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div className="form__element">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div className="form__element">
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="form__button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
