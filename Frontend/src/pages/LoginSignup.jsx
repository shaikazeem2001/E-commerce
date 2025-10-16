import React, { useState } from "react";
import "./css/LoginSignup.css";

const handlesubmit = (e) => {
  e.preventDefault();
  console.log("email submitted");
};

const LoginSignup = () => {
  const [email, setEmail] = useState(" ");
  return (
    <form className="loginsignup" onSubmit={handlesubmit}>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          {/* Name Field */}
          <input
            type="text"
            placeholder="Your Name"
          />

          {/* Email Field */}
          <input type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address" />

          {/* Password Field */}
          <input type="password" placeholder="Password" />
        </div>

        {/* Continue Button */}
        <button>Continue</button>

        {/* Login Link */}
        <p className="loginsignup-login">
          Already have an account? <span>Login here</span>
        </p>

        {/* Terms and Policy Checkbox */}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
