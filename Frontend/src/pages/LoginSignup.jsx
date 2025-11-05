import React, { useState } from "react";
import "./css/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Signup");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changehandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function:", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
      .then((data) => (responseData = data));

      if(responseData.success){
        localStorage.setItem('set-token',responseData.token)
        window.location.replace('/');
      }
      else{
       alert(responseData.errors)
      }
  };

  const signup = async () => {
    console.log("Signup function:", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json())
      .then((data) => (responseData = data));

      if(responseData.success){
        localStorage.setItem('set-token',responseData.token)
        window.location.replace('/');
      }
      else{
       alert(responseData.errors)
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
