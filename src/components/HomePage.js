import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you update this CSS file

function HomePage() {
  const handleButtonClick = () => {
    window.open('https://open.substack.com/pub/allisoncao/p/drugscan-preventing-accidental-addiction?r=47kohk&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true', '_blank');
  };
  return (
    <div className="home-page">
      <div className="green-rectangle">
        <div className="title">DRUGSCAN</div>
      <div className="subtitle">Preventing accidental addiction one image at a time.</div>
      <Link to="/camera" className="start-camera-btn">GET STARTED</Link>
      <p className="blurb">It's free and we don't collect any of your personal information!</p>
      </div>
      <div className="home-container">
        <h1>How it works</h1>
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
      </div>
      <div className="green-rectangle">
        <h1>ABOUT DRUGSCAN</h1>
        <p className="app-description">
        My name is Allison, I go to Tumwater Middle School, and this is how I used AI to create an application that tells you if a drug can be addictive from just a simple picture. 
        </p>
        <h1>Read more at:</h1>
        <button onClick={handleButtonClick} className="start-camera-btn">
         MY SUBSTACK
        </button>
      </div>
    </div>
  );
}

export default HomePage;
