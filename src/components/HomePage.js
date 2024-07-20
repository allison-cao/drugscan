import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this CSS file

function HomePage() {
  return (
    <div className="home-container">
      <h2>How it works</h2>
      <div className="image-container">
        <div className="image-block">
          <img src="2933639C-EF2B-447E-9CDF-F00B10B17280.png" alt="Drug Example 1" />
          <p>Click "Get Started".</p>
        </div>
        <div className="image-block">
          <img src="D5B0AE6D-9DDD-4754-9681-756CE5C2B8A0.png" alt="Drug Example 2" />
          <p>Click "Allow".</p>
        </div>
        <div className="image-block">
          <img src="step3.png" alt="Drug Example 3" />
          <p>Press "Capture Image".</p>
        </div>
        <div className="image-block">
          <img src="55AA5DD0-7086-48B8-8F17-7BA623BF81C1.png" alt="Drug Example 4" />
          <p>Read and click "Scan Another Drug" if needed.</p>
        </div>
      </div>
      <Link to="/camera" className="start-camera-btn">Get Started</Link>  {/* Updated text here */}
      <div className="privacy-block">
        <p>Privacy Policy: We do not collect, store, or share any of your personal data or information. Your privacy is fully respected and protected.</p>
      </div>
    </div>
  );
}

export default HomePage;
