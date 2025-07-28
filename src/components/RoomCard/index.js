import React from 'react';
import { motion } from 'framer-motion';
import styles from './roomCard.module.scss';

const RoomCard = ({ room, onClick }) => {
  const cardVariants = {
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
    <motion.div
      className={styles.roomCard}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onClick={onClick}
    >
      <div className={styles.imageContainer}>
        <img 
          src={room.image} 
          alt={room.title}
          className={styles.roomImage}
        />
        
        {/* Overlay - Only visible when active */}
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <div className={styles.textContent}>
              <span className={styles.category}>
                {String(room.id).padStart(2, '0')} — {room.category}
              </span>
              <h3 className={styles.roomTitle}>
                {room.title}
              </h3>
            </div>
            <button className={styles.navButton}>
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomCard; 