import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import ErrorPage from './components/ErrorPage.js'

function App() {
  return (
    <div className="App">
          <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route path='/' element = {<Home/>} />
          </Routes>
          <Routes>
            <Route path='/404' element={<ErrorPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
