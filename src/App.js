import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CameraPage from './components/CameraPage';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <HamburgerMenu />
        <h1>Drug Recognition App</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
