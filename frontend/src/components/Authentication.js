import React, { useState } from "react";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const Authentication = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      <div>
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Sign Up</button>
      </div>
      <div>{showLogin ? <LoginComponent /> : <SignupComponent />}</div>
    </div>
  );
};

export default Authentication;
