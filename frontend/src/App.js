import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PredictionPage from "./pages/PredictionPage";
import ErrorPage from "./pages/ErrorPage";
import Authentication from "./pages/Authentication";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/authenticate" element={user ? <PredictionPage /> : <Authentication />} />
              <Route path="/predict" element={user ? <PredictionPage /> : <Authentication/>} />
              <Route path="/404" element={user ? <ErrorPage/> : <Authentication/>} />
              <Route path="*" element={user ? <Navigate to="/404" /> : <Authentication/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
