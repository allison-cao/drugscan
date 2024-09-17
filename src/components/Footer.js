// Footer.js

import React from 'react';
import './Footer.css'; // Assuming you have some CSS for styling

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>Have any questions, comments, or concerns? Contact me at: <a href="allisoncao11@gmail.com">allisoncao11@gmail.com</a></p>
                <p className="privacy-policy">We do not collect any of your personal data. Our application utilizes artificial intelligence, which, while advanced, may not always provide 100% accurate or reliable results. Please use discretion and verify information independently.</p>
            </div>
        </footer>
    );
};

export default Footer; // Default export of the Footer component
