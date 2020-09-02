import React, { useState, useEffect } from "react";
import "./App.css";
import Swal from "sweetalert2";
import Logo from "./logo.jpg";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  const user = {
    email: "test@test.com",
    password: "12345",
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.length && !password.length && !enteredCaptcha.length) {
      return Swal.fire("Warning", "Please fill all the fields", "error");
    }
    if (!email.length) {
      return Swal.fire("Warning", "Please enter email", "warning");
    }

    if (email !== user.email) {
      return Swal.fire(
        "Opps...",
        "User does not exist with this email",
        "error"
      );
    }
    if (!password.length) {
      return Swal.fire("Warning", "Please enter password", "warning");
    }

    if (!captcha.length) {
      return Swal.fire("Warning", "Please enter captcha", "warning");
    }
    if (password !== user.password) {
      return Swal.fire("Opps...", "Incorrect password", "error");
    }
    if (!enteredCaptcha.length) {
      return Swal.fire("Opps...", "Please enter captcha", "error");
    }
    if (enteredCaptcha !== captcha) {
      return Swal.fire("Opps...", "Incorrect captcha", "error");
    }
    if (
      email === user.email &&
      password === user.password &&
      enteredCaptcha === captcha
    ) {
      return Swal.fire("Success", "User logged in successfully", "success");
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const data = Math.random().toString(36).substr(2, 6);
    setCaptcha(data);
  };

  const refreshHanlder = (e) => {
    e.preventDefault();
    generateCaptcha();
  };
  return (
    <div className="signin">
      <img src={Logo} width="250" height="66" alt="logo" />
      <div className="signin__container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label className="signin__label">Email*</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="signin__label">Password*</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="signin__captch">
            <div className="captcha">{captcha}</div>
            <button className="" onClick={refreshHanlder}>
              Refresh
            </button>
          </div>
          <div className="form-group">
            <label className="signin__label">Captcha*</label>
            <input
              type="text"
              className="form-control"
              value={enteredCaptcha}
              onChange={(e) => setEnteredCaptcha(e.target.value)}
              placeholder="Enter captcha"
            />
          </div>
          <div>
            <button className="signin__button" onClick={submitHandler}>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
