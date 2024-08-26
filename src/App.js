import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CameraPage from './components/CameraPage';
import HamburgerMenu from './components/HamburgerMenu';
import Footer from './components/Footer'; 
import './components/Footer.css';  // Ensure the Footer's CSS is imported
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App" style={{
        position: 'relative', 
        paddingTop: '70px',
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
