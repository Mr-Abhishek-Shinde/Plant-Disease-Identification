import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Authentication from "./components/Authentication";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Authentication />
  </React.StrictMode>
);
