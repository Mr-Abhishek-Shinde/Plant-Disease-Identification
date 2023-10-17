import React, { useState } from "react";
// import "./SignupComponent.css"; // Import the CSS file
import "../login.css"; // Import the CSS file

const SignupComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Handle signup logic here, e.g., send data to the server
  };

  return (
    <div className="signup-container">
      {/* <h2>Sign Up</h2> */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>
      <button onClick={handleSignup} className="btn-primary">
        Sign Up
      </button>
    </div>
  );
};

export default SignupComponent;
