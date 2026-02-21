import React, { useState } from "react";
import "./css/LoginSignup.css";
import api from "../api/axios";
import toast from 'react-hot-toast';

const LoginSignup = () => {
  const [state, setState] = useState("Signup");
  const [error, setError] = useState("");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changehandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on change
  };

  const login = async () => {
    setError("");
    console.log("Login function:", formData);
    try {
      const response = await api.post('/login', formData);

      if (response.data.success) {
        toast.success("Login Successful! Welcome back. 🚀");
        setTimeout(() => window.location.replace('/'), 1000);
      } else {
        setError(response.data.error);
        toast.error(response.data.error || "Login failed");
      }
    } catch (err) {
      const msg = err.response?.data?.error || "An error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  const signup = async () => {
    setError("");
    console.log("Signup function:", formData);
    try {
      const response = await api.post('/signup', formData);

      if (response.data.success) {
        toast.success("Signup Successful! Welcome to Trend. 🥳");
        setTimeout(() => window.location.replace('/'), 1000);
      } else {
        setError(response.data.error);
        toast.error(response.data.error || "Signup failed");
      }
    } catch (err) {
      const msg = err.response?.data?.error || "An error occurred. Please try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <form className="loginsignup" onSubmit={(e) => e.preventDefault()}>
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Signup" && (
            <input
              name="username"
              value={formData.username}
              onChange={changehandler}
              type="text"
              placeholder="Your Name"
            />
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changehandler}
            placeholder="Email Address"
          />

          <input
            name="password"
            value={formData.password}
            onChange={changehandler}
            type="password"
            placeholder="Password"
          />
        </div>

        {error && <p className="loginsignup-error">{error}</p>}

        <button
          onClick={(e) => {
            e.preventDefault();
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>

        {state === "Signup" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account{" "}
            <span onClick={() => setState("Signup")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
