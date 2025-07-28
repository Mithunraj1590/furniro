import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './header.module.scss';
import UserActions from './UserActions';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  // Mock user state - replace with actual authentication
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true for testing
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/40x40/666/fff?text=JD'
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
    // Add actual sign in logic here
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    // Add actual sign out logic here
  };

  // Check if a link is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Animation variants
  const headerVariants = {
    hidden: { 
      y: -100, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: -20, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <>
      <motion.header 
        className={styles.header}
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <div className="row align-items-center justify-content-between">
            {/* Logo */}
            <motion.div 
              className="col-auto d-flex align-items-center"
              variants={itemVariants}
            >
              <Link to="/" className={styles.logoLink} onClick={closeMenu}>
                <span className={styles.logo}>
                  {/* Inline SVG logo */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 24L16 4L30 24" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round"/>
                    <path d="M6 24L16 10L26 24" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.brand}>Furniro</span>
              </Link>
            </motion.div>
            
            {/* Navigation */}
            <motion.nav 
              className="col d-none d-lg-flex justify-content-center"
              variants={itemVariants}
            >
              <ul className={styles.navList}>
                <li>
                  <Link 
                    to="/" 
                    className={`nav-link ${isActive('/') ? styles.active : ''}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/shop" 
                    className={`nav-link ${isActive('/shop') ? styles.active : ''}`}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/about" 
                    className={`nav-link ${isActive('/about') ? styles.active : ''}`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className={`nav-link ${isActive('/contact') ? styles.active : ''}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.nav>
            
            {/* Icons and User Actions */}
            <motion.div 
              className="col-auto d-flex gap-3 align-items-center"
              variants={itemVariants}
            >
              <motion.span 
                className={styles.icon} 
                onClick={toggleSearch}
                style={{ cursor: 'pointer' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-search"></i>
              </motion.span>
              
              {/* User Actions - Hidden on mobile */}
              <div className="d-none d-lg-flex gap-3 align-items-center">
                <UserActions 
                  isLoggedIn={isLoggedIn}
                  user={user}
                  onSignIn={handleSignIn}
                  onSignOut={handleSignOut}
                />
              </div>
              
              {/* Hamburger Menu Button */}
              <motion.button 
                className={`d-lg-none ${styles.hamburgerBtn}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
                <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar 
          isOpen={isSearchOpen}
          onClose={closeSearch}
        />

        {/* Mobile Menu Overlay */}
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={closeMenu}
          isLoggedIn={isLoggedIn}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          user={user}
        />
      </motion.header>
    </>
  );
};

export default Header; 