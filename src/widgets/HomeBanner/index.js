import React from 'react';
import { motion } from 'framer-motion';
import styles from './homeBanner.module.scss';

const HomeBanner = () => {
  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const backgroundVariants = {
    hidden: { 
      scale: 1.1,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const textVariants = {
    hidden: { 
      y: 30,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      y: 20,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.99],
        delay: 0.8
      }
    }
  };

  return (
    <motion.section 
      className={styles.homeBanner}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className={styles.bannerContent}>
              {/* Background Image */}
              <motion.div 
                className={styles.backgroundImage}
                variants={backgroundVariants}
              >
                <img 
                  src="/banner.png" 
                  alt="Home Banner" 
                  className={styles.bannerImage}
                />
              </motion.div>
              
              {/* Promotional Overlay */}
              <div className={styles.promotionalOverlay}>
                <div className={styles.overlayContent}>
                  <motion.span 
                    className={styles.newArrival}
                    variants={textVariants}
                  >
                    New Arrival
                  </motion.span>
                  <motion.h1 
                    className={`h1 ${styles.mainHeading}`}
                    variants={textVariants}
                  >
                    <span>Discover Our</span>
                    <span>New Collection</span>
                  </motion.h1>
                  <motion.p 
                    className={styles.description}
                    variants={textVariants}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
                  </motion.p>
                  <motion.button 
                    className="btn btn-primary"
                    variants={buttonVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    BUY NOW
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeBanner; 