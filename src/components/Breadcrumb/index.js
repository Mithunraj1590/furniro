import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './breadcrumb.module.scss';

const Breadcrumb = ({ productName }) => {
  const location = useLocation();
  
  // Determine current page for breadcrumb
  const getCurrentPage = () => {
    if (location.pathname.startsWith('/product/')) {
      return 'Product Detail';
    } else if (location.pathname === '/shop') {
      return 'Shop';
    } else if (location.pathname === '/cart') {
      return 'Cart';
    } else if (location.pathname === '/wishlist') {
      return 'Wishlist';
    } else if (location.pathname === '/shipping-info') {
      return 'Shipping Info';
    } else if (location.pathname === '/returns') {
      return 'Returns';
    } else if (location.pathname === '/size-guide') {
      return 'Size Guide';
    } else if (location.pathname === '/faq') {
      return 'FAQ';
    } else if (location.pathname === '/support') {
      return 'Support';
    } else if (location.pathname === '/') {
      return 'Home';
    }
    return '';
  };

  const currentPage = getCurrentPage();

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className="container">
        <ol className={styles.breadcrumbList}>
          <li className={styles.breadcrumbItem}>
            <Link to="/" className={styles.breadcrumbLink}>
              Home
            </Link>
          </li>
          
          {currentPage !== 'Home' && (
            <>
              <li className={styles.breadcrumbSeparator}>
                <i className="bi bi-chevron-right"></i>
              </li>
              <li className={styles.breadcrumbItem}>
                {currentPage === 'Shop' ? (
                  <span className={styles.breadcrumbCurrent}>Shop</span>
                ) : currentPage === 'Cart' ? (
                  <span className={styles.breadcrumbCurrent}>Cart</span>
                ) : currentPage === 'Wishlist' ? (
                  <span className={styles.breadcrumbCurrent}>Wishlist</span>
                ) : currentPage === 'Shipping Info' ? (
                  <span className={styles.breadcrumbCurrent}>Shipping Info</span>
                ) : currentPage === 'Returns' ? (
                  <span className={styles.breadcrumbCurrent}>Returns</span>
                ) : currentPage === 'Size Guide' ? (
                  <span className={styles.breadcrumbCurrent}>Size Guide</span>
                ) : currentPage === 'FAQ' ? (
                  <span className={styles.breadcrumbCurrent}>FAQ</span>
                ) : currentPage === 'Support' ? (
                  <span className={styles.breadcrumbCurrent}>Support</span>
                ) : (
                  <Link to="/shop" className={styles.breadcrumbLink}>
                    Shop
                  </Link>
                )}
              </li>
            </>
          )}

          {currentPage === 'Product Detail' && productName && (
            <>
              <li className={styles.breadcrumbSeparator}>
                <i className="bi bi-chevron-right"></i>
              </li>
              <li className={styles.breadcrumbSeparator}>
                <div className={styles.verticalLine}></div>
              </li>
              <li className={styles.breadcrumbItem}>
                <span className={styles.breadcrumbCurrent}>{productName}</span>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 