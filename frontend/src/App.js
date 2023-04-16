import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PredictionPage from './pages/PredictionPage'
import ErrorPage from './pages/ErrorPage'

function App() {
  return (
    <div className="App">
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/predict' element={<PredictionPage />} />
              <Route path='/404' element={<ErrorPage />} />
              <Route path='*' element={<Navigate to='/404' />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
