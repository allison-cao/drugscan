import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CameraPage from './components/CameraPage';
import HamburgerMenu from './components/HamburgerMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ 
        position: 'relative', 
        minHeight: '100vh',
        paddingBottom: '175px'  // Increased padding to accommodate two footers
      }}>
        <HamburgerMenu />
        <h1>DRUGSCAN</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
        </Routes>
        <footer className="contact1">
          Have any questions, comments, or concerns? Contact me at: hysmlorgf@gmail.com
        </footer>
        <footer className="disclaimer">
          Disclaimer: We do not collect, store, or share any of your personal data or information. Your privacy is fully respected and protected.
        </footer>
        <footer className="privacy">
          Privacy Policy: Our application utilizes artificial intelligence, which, while advanced, may not always provide 100% accurate or reliable results. Please use discretion and verify information independently.
        </footer>
      </div>

    </Router>
  );
}

export default App;
