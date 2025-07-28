import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const MobileMenu = ({ isOpen, onClose, isLoggedIn, onSignIn, onSignOut, user }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Mock data
  const [wishlist] = useState([
    { id: 1, name: 'Modern Chair', price: '$299' },
    { id: 2, name: 'Wooden Table', price: '$199' }
  ]);

  const [cart] = useState([
    { id: 1, name: 'Comfortable Sofa', price: '$599', quantity: 1 },
    { id: 2, name: 'Dining Chair', price: '$89', quantity: 2 }
  ]);

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

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      onClose();
      return;
    }
    // Handle wishlist navigation
    console.log('Navigate to wishlist');
    onClose();
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      onClose();
      return;
    }
    // Handle cart navigation
    console.log('Navigate to cart');
    onClose();
  };

  // Reset modals when mobile menu opens
  useEffect(() => {
    if (isOpen) {
      setShowLoginModal(false);
      setShowSignupModal(false);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={`${styles.mobileMenu} ${styles.active}`}>
        <div className={styles.mobileMenuContent}>
          {/* Navigation Links */}
          <ul className={styles.mobileNavList}>
            <li><Link to="/" className="nav-link" onClick={onClose}>Home</Link></li>
            <li><Link to="/shop" className="nav-link" onClick={onClose}>Shop</Link></li>
            <li><Link to="/about" className="nav-link" onClick={onClose}>About</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={onClose}>Contact</Link></li>
          </ul>

          {/* Mobile User Actions */}
          <div className={styles.mobileUserActions}>
            {/* Wishlist */}
            <div className={styles.mobileActionItem}>
              <button 
                className={styles.mobileActionBtn}
                onClick={handleWishlistClick}
              >
                <i className="bi bi-heart"></i>
                <span>Wishlist</span>
                {isLoggedIn && wishlist.length > 0 && (
                  <span className={styles.mobileBadge}>{wishlist.length}</span>
                )}
              </button>
            </div>

            {/* Cart */}
            <div className={styles.mobileActionItem}>
              <button 
                className={styles.mobileActionBtn}
                onClick={handleCartClick}
              >
                <i className="bi bi-cart"></i>
                <span>Cart</span>
                {isLoggedIn && cart.length > 0 && (
                  <span className={styles.mobileBadge}>{cart.length}</span>
                )}
              </button>
            </div>

            {/* User Account */}
            <div className={styles.mobileActionItem}>
              {isLoggedIn ? (
                <div className={styles.mobileUserAccount}>
                  <div className={styles.mobileUserInfo}>
                    <img src={user.avatar} alt={user.name} className={styles.mobileUserAvatar} />
                    <div className={styles.mobileUserDetails}>
                      <span className={styles.mobileUserName}>{user.name}</span>
                      <span className={styles.mobileUserEmail}>{user.email}</span>
                    </div>
                  </div>
                  <div className={styles.mobileUserActions}>
                    <button className="btn btn-outline-primary btn-sm w-100 mb-2">
                      <i className="bi bi-person me-2"></i>
                      Profile
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => {
                        onSignOut();
                        onClose();
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => {
                    setShowLoginModal(true);
                    onClose();
                  }}
                >
                  <i className="bi bi-person me-2"></i>
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};

export default MobileMenu; 