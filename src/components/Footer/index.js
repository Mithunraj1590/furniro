import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './footer.module.scss';

const Footer = () => {
  const location = useLocation();
  
  // Helper function to check if a link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className="container">
          <motion.div
            className={styles.footerContent}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="row">
              {/* Company Information */}
              <motion.div
                className="col-12 col-lg-4"
                variants={itemVariants}
              >
                <div className={styles.companyInfo}>
                  <h3 className={styles.brandName}>Funiro.</h3>
                  <p className={styles.companyDescription}>
                    Your trusted destination for premium furniture and home decor.
                    We bring style and comfort to every room in your home.
                  </p>
                  <address className={styles.address}>
                    <div className={styles.addressItem}>
                      <i className="bi bi-geo-alt"></i>
                      <div>
                        <strong>Address</strong>
                        <p>400 University Drive Suite 200<br />Coral Gables, FL 33134 USA</p>
                      </div>
                    </div>
                    <div className={styles.addressItem}>
                      <i className="bi bi-telephone"></i>
                      <div>
                        <strong>Phone</strong>
                        <p>+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className={styles.addressItem}>
                      <i className="bi bi-envelope"></i>
                      <div>
                        <strong>Email</strong>
                        <p>hello@funiro.com</p>
                      </div>
                    </div>
                  </address>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="col-12 col-md-6 col-lg-3"
                variants={itemVariants}
              >
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Quick Links</h4>
                  <ul className={styles.linkList}>
                    <li>
                      <Link 
                        to="/" 
                        className={`${styles.footerLink} ${isActiveLink('/') ? styles.active : ''}`}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/shop" 
                        className={`${styles.footerLink} ${isActiveLink('/shop') ? styles.active : ''}`}
                      >
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/about" 
                        className={`${styles.footerLink} ${isActiveLink('/about') ? styles.active : ''}`}
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/contact" 
                        className={`${styles.footerLink} ${isActiveLink('/contact') ? styles.active : ''}`}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/blog" 
                        className={`${styles.footerLink} ${isActiveLink('/blog') ? styles.active : ''}`}
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Customer Service */}
              <motion.div
                className="col-12 col-md-6 col-lg-3"
                variants={itemVariants}
              >
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Customer Service</h4>
                  <ul className={styles.linkList}>
                    <li>
                      <Link 
                        to="/shipping-info" 
                        className={`${styles.footerLink} ${isActiveLink('/shipping-info') ? styles.active : ''}`}
                      >
                        Shipping Info
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/returns" 
                        className={`${styles.footerLink} ${isActiveLink('/returns') ? styles.active : ''}`}
                      >
                        Returns
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/size-guide" 
                        className={`${styles.footerLink} ${isActiveLink('/size-guide') ? styles.active : ''}`}
                      >
                        Size Guide
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/faq" 
                        className={`${styles.footerLink} ${isActiveLink('/faq') ? styles.active : ''}`}
                      >
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/support" 
                        className={`${styles.footerLink} ${isActiveLink('/support') ? styles.active : ''}`}
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                className="col-12 col-md-6 col-lg-2"
                variants={itemVariants}
              >
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Follow Us</h4>
                  <div className={styles.socialLinks}>
                    <a href="https://facebook.com" className={styles.socialLink} aria-label="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" className={styles.socialLink} aria-label="Twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" className={styles.socialLink} aria-label="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="https://pinterest.com" className={styles.socialLink} aria-label="Pinterest">
                      <i className="bi bi-pinterest"></i>
                    </a>
                    <a href="https://youtube.com" className={styles.socialLink} aria-label="YouTube">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </div>
                  <div className={styles.paymentMethods}>
                    <h5>We Accept</h5>
                    <div className={styles.paymentIcons}>
                      <i className="bi bi-credit-card"></i>
                      <i className="bi bi-paypal"></i>
                      <i className="bi bi-apple"></i>
                      <i className="bi bi-google"></i>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className={styles.copyright}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.copyrightContent}>
              <div className={styles.copyrightLeft}>
                <p>&copy; 2024 Funiro. All rights reserved.</p>
              </div>
              <div className={styles.copyrightRight}>
                <Link to="/privacy" className={styles.copyrightLink}>Privacy Policy</Link>
                <Link to="/terms" className={styles.copyrightLink}>Terms of Service</Link>
                <Link to="/sitemap" className={styles.copyrightLink}>Sitemap</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 