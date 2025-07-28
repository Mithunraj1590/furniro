import React, { useState, useEffect } from 'react';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import styles from './loginModal.module.scss';

const LoginModal = ({ isOpen, onClose, onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Cleanup on unmount
    return () => {
      if (isOpen) {
        unlockScroll();
      }
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual login logic here
    console.log('Login attempt:', formData);
    onLoginSuccess();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSwitchToSignup = () => {
    onClose();
    onSwitchToSignup();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h4>Welcome Back</h4>
            <p className="text-muted mb-0">Sign in to your account</p>
          </div>
          <button 
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                <i className="bi bi-lock me-2"></i>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <button type="button" className="btn btn-link p-0 text-decoration-none">
                Forgot password?
              </button>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100 mb-3"
            >
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </button>
          </form>
          
          <div className={styles.divider}>
            <span>or continue with</span>
          </div>
          
          <div className={styles.socialLogin}>
            <button className="btn btn-outline-secondary w-100 mb-3">
              <i className="bi bi-google me-2"></i>
              Continue with Google
            </button>
            <button className="btn btn-outline-secondary w-100">
              <i className="bi bi-facebook me-2"></i>
              Continue with Facebook
            </button>
          </div>
          
          <div className={styles.signUpPrompt}>
            <p className="text-center mb-0">
              Don't have an account?{' '}
              <button 
                type="button" 
                className="btn btn-link p-0 text-decoration-none"
                onClick={handleSwitchToSignup}
              >
                Create one now
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 