import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './header.module.scss';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import WishlistDropdown from './WishlistDropdown';
import CartDropdown from './CartDropdown';
import UserDropdown from './UserDropdown';

const UserActions = ({ isLoggedIn, user, onSignIn, onSignOut }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const cartDropdownRef = useRef(null);
  const wishlistDropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdowns when route changes
  useEffect(() => {
    closeAllDropdowns();
  }, [location.pathname]);

  // Handle click outside to close cart dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        // Only close if clicking outside the entire dropdown container
        setIsCartDropdownOpen(false);
      }
    };

    // Only add event listener if dropdown is open
    if (isCartDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartDropdownOpen]); // Added dependency

  // Handle click outside to close wishlist dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wishlistDropdownRef.current && !wishlistDropdownRef.current.contains(event.target)) {
        // Only close if clicking outside the entire dropdown container
        setIsWishlistDropdownOpen(false);
      }
    };

    // Only add event listener if dropdown is open
    if (isWishlistDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWishlistDropdownOpen]);

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsWishlistDropdownOpen(!isWishlistDropdownOpen);
    setIsCartDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsCartDropdownOpen(!isCartDropdownOpen);
    setIsWishlistDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleUserClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsWishlistDropdownOpen(false);
    setIsCartDropdownOpen(false);
  };

  const closeAllDropdowns = () => {
    setIsWishlistDropdownOpen(false);
    setIsCartDropdownOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onSignIn();
  };

  const handleSignupSuccess = () => {
    setShowSignupModal(false);
    onSignIn();
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      {/* Wishlist Icon/Dropdown */}
      <div className={styles.dropdownContainer} ref={wishlistDropdownRef}>
        <span 
          className={styles.icon} 
          onClick={handleWishlistClick}
          tabIndex="0"
        >
          <i className="bi bi-heart"></i>
        </span>
        
        {isLoggedIn && (
          <WishlistDropdown 
            isOpen={isWishlistDropdownOpen}
            onClose={() => setIsWishlistDropdownOpen(false)}
          />
        )}
      </div>
      
      {/* Cart Icon/Dropdown */}
      <div className={styles.dropdownContainer} ref={cartDropdownRef}>
        <span 
          className={styles.icon} 
          onClick={handleCartClick}
          tabIndex="0"
        >
          <i className="bi bi-cart"></i>
        </span>
        
        {isLoggedIn && (
          <CartDropdown 
            isOpen={isCartDropdownOpen}
            onClose={() => setIsCartDropdownOpen(false)}
          />
        )}
      </div>
      
      {/* User Icon/Dropdown for logged in users */}
      {isLoggedIn ? (
        <div className={styles.userDropdown}>
          <span 
            className={styles.icon} 
            onClick={handleUserClick}
            onBlur={closeAllDropdowns}
            tabIndex="0"
          >
            <i className="bi bi-person"></i>
          </span>
          
          <UserDropdown 
            isOpen={isUserDropdownOpen}
            user={user}
            onSignOut={onSignOut}
            onClose={() => setIsUserDropdownOpen(false)}
          />
        </div>
      ) : (
        /* Sign In Button for logged out users */
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setShowLoginModal(true)}
        >
          <i className="bi bi-person me-2"></i>
          Sign In
        </button>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal}
        onClose={closeSignupModal}
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default UserActions; 