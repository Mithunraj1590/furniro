import React, { useState, useEffect } from 'react';
import styles from './themeToggle.module.scss';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon'}`}></i>
    </button>
  );
};

export default ThemeToggle; 