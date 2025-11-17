import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageConverter from '../LanguageConverter/LanguageConverter';
import AuthModule from '../AuthModule/AuthModule';
import Search from './Search/Search';
import Cart from './Cart/Cart';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { title: 'Vision', path: '/vision' },
    { title: 'Infrastructure', path: '/infrastructure' },
    { title: 'Robotics', path: '/robotics' },
    { title: 'Intelligence', path: '/intelligence' },
    
    { title: 'LearnAI', path: '/education' },
    { title: 'Careers', path: '/careers' },
    { title: 'Partners', path: '/partners' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="EthiMind-logo">
            EthiMind <span className="logo-sparkle">✨</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navigationItems.map((item, index) => (
            <div key={index} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.title}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Search Component */}
          <Search />
          
          {/* Language Converter */}
          <LanguageConverter />
          
          {/* Auth Module */}
          <AuthModule />
          
          {/* Cart Component */}
          <Cart />
          
          <button 
            className="icon-btn menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span className="icon">☰</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          {navigationItems.map((item, index) => (
            <div key={index} className="mobile-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </NavLink>
            </div>
          ))}
          <div className="mobile-nav-actions">
            <button className="btn">Sign In</button>
            <button className="btn btn-secondary">Register</button>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className="overlay" 
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;