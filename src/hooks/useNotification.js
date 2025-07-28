import { useState, useCallback } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    duration: 5000
  });

  const showNotification = useCallback((message, type = 'success', duration = 5000) => {
    setNotification({
      isVisible: true,
      message,
      type,
      duration
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  return {
    notification,
    showNotification,
    hideNotification
  };
};

export default useNotification; 