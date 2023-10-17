import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PredictionPage from "./pages/PredictionPage";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";
import { useState } from "react";

function App() {
  const { user } = useAuthContext();
  const [onPrediction, setOnPrediction] = useState(false);
  const [onLogin, setOnLogin] = useState(false);

  const alterPredition = (arg) => {
    setOnPrediction(arg);
  };

  const alterLogin = (arg) => {
    setOnLogin(arg);
  };
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Navbar onPrediction={onPrediction} onLogin={onLogin} />
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    setOnPrediction={alterPredition}
                    alterLogin={alterLogin}
                  />
                }
              />
              <Route
                path="/authenticate"
                element={
                  user ? (
                    <PredictionPage setOnPrediction={alterPredition} />
                  ) : (
                    <Authentication alterLogin={alterLogin} />
                  )
                }
              />
              <Route
                path="/predict"
                element={
                  user ? (
                    <PredictionPage setOnPrediction={setOnPrediction} />
                  ) : (
                    <Authentication alterLogin={alterLogin} />
                  )
                }
              />
              <Route
                path="/404"
                element={
                  user ? (
                    <ErrorPage />
                  ) : (
                    <Authentication alterLogin={alterLogin} />
                  )
                }
              />
              <Route
                path="*"
                element={
                  user ? (
                    <Navigate to="/404" />
                  ) : (
                    <Authentication alterLogin={alterLogin} />
                  )
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
