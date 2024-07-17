import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this CSS file

function HomePage() {
  return (
    <div className="home-container">
      <h2>How it works</h2>
      <div className="image-container">
        <div className="image-block">
          <img src="https://via.placeholder.com/150" alt="Drug Example 1" />
          <p>This is where you can learn about the recognition of drug 1.</p>
        </div>
        <div className="image-block">
          <img src="https://via.placeholder.com/150" alt="Drug Example 2" />
          <p>This section explains the properties of drug 2.</p>
        </div>
        <div className="image-block">
          <img src="https://via.placeholder.com/150" alt="Drug Example 3" />
          <p>Discover how drug 3 affects the human body.</p>
        </div>
        <div className="image-block">
          <img src="https://via.placeholder.com/150" alt="Drug Example 4" />
          <p>Insights into the usage and effects of drug 4.</p>
        </div>
      </div>
      <Link to="/camera" className="start-camera-btn">Get Started</Link>  {/* Updated text here */}
    </div>
  );
}

export default HomePage;
