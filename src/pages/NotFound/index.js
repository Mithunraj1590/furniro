import React from 'react';
import { Link } from 'react-router-dom';
import styles from './notFound.module.scss';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found | Ecom Store</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className={styles.notFoundPage}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <i className="bi bi-emoji-frown"></i>
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist or has been moved.</p>
          <Link to="/" className="btn btn-primary mt-3">
            Go to Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound; 