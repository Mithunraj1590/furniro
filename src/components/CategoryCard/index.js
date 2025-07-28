import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './categoryCard.module.scss';

const CategoryCard = ({ category }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 30
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

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const titleVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div 
      className={styles.categoryCard}
      variants={cardVariants}
      whileHover="hover"
    >
      <Link to={`/category/${category.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          <motion.img 
            src={category.image} 
            alt={category.title}
            className={styles.categoryImage}
            variants={imageVariants}
            loading="lazy"
          />
          <div className={styles.imageOverlay}>
            <motion.div 
              className={styles.overlayContent}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className={styles.viewMore}>View More</span>
            </motion.div>
          </div>
        </div>
        
        <motion.h3 
          className={styles.categoryTitle}
          variants={titleVariants}
        >
          {category.title}
        </motion.h3>
        
        <p className={styles.categoryDescription}>
          {category.description}
        </p>
      </Link>
    </motion.div>
  );
};

export default CategoryCard; 