import React, { useState, useEffect } from 'react';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import styles from './loginModal.module.scss';

const SignupModal = ({ isOpen, onClose, onSignupSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add actual signup logic here
      console.log('Signup attempt:', formData);
      onSignupSuccess();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSwitchToLogin = () => {
    onClose();
    onSwitchToLogin();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h4>Create Account</h4>
            <p className="text-muted mb-0">Join us and start shopping</p>
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
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="firstName" className="form-label">
                  <i className="bi bi-person me-2"></i>
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              
              <div className="col-md-6 mb-4">
                <label htmlFor="lastName" className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="signupEmail" className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="signupEmail"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="signupPassword" className="form-label">
                <i className="bi bi-lock me-2"></i>
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="signupPassword"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a strong password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                <i className="bi bi-shield-lock me-2"></i>
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            
            <div className="mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  required
                />
                <label className="form-check-label" htmlFor="agreeTerms">
                  I agree to the{' '}
                  <button type="button" className="btn btn-link p-0 text-decoration-none">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="btn btn-link p-0 text-decoration-none">
                    Privacy Policy
                  </button>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100 mb-3"
            >
              <i className="bi bi-person-plus me-2"></i>
              Create Account
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
              Already have an account?{' '}
              <button 
                type="button" 
                className="btn btn-link p-0 text-decoration-none"
                onClick={handleSwitchToLogin}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal; 