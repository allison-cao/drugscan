import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './HamburgerMenu.css';

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="hamburger-menu">
            <button onClick={toggleMenu} className="menu-icon">
                ☰
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li><Link to="/" onClick={() => setIsOpen(false)}>HomePage</Link></li>
                        <li><Link to="/camera" onClick={() => setIsOpen(false)}>CameraPage</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;
