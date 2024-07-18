import React, { useState } from 'react';
import './HamburgerMenu.css'; // Make sure to create this CSS file

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
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;
