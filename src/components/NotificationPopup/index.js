import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './notificationPopup.module.scss';

const NotificationPopup = ({ 
  isVisible, 
  message, 
  type = 'success', 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle';
      case 'error':
        return 'bi bi-x-circle';
      case 'warning':
        return 'bi bi-exclamation-triangle';
      case 'info':
        return 'bi bi-info-circle';
      default:
        return 'bi bi-check-circle';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.success;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={`${styles.popup} ${getTypeClass()}`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ 
              duration: 0.4,
              ease: [0.6, 0.05, 0.01, 0.99]
            }}
          >
            <div className={styles.iconContainer}>
              <i className={getIcon()}></i>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>
                {type === 'success' ? 'Success!' : 
                 type === 'error' ? 'Error!' : 
                 type === 'warning' ? 'Warning!' : 'Info!'}
              </h3>
              <p className={styles.message}>{message}</p>
            </div>
            <button 
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close notification"
            >
              <i className="bi bi-x"></i>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPopup; 