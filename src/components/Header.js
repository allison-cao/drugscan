import React, { useState, useEffect } from 'react';

// Assuming you have a separate HamburgerMenu component
import HamburgerMenu from './HamburgerMenu';

// NavBar Component for larger screens
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><a href="/ ">HomePage</a></li>
        <li><a href="/camera">CameraPage</a></li>
      </ul>
    </nav>
  );
};

// Header Component that toggles between NavBar and HamburgerMenu based on screen width
const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      {isMobile ? <HamburgerMenu /> : <NavBar />}
    </header>
  );
};

export default Header;
