import React, { useState } from "react";
// import "./LoginComponent.css"; // Import the CSS file
import "../login.css"; // Import the CSS file

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here, e.g., send data to the server
  };

  return (
    <div className="login-container">
      {/* <h2>Login</h2> */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button onClick={handleLogin} className="btn-primary">
        Login
      </button>
    </div>
  );
};

export default LoginComponent;
