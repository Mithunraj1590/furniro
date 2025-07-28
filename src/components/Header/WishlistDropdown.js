import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../store/wishlistSlice';
import styles from './header.module.scss';

const WishlistDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.dropdownMenu}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.dropdownHeader}>
            <h4>Wishlist</h4>
            <div className={styles.wishlistIcon}>
              <i className="bi bi-heart"></i>
            </div>
          </div>

          <div className={styles.dropdownItems}>
            {wishlistItems.length === 0 ? (
              <div className={styles.emptyWishlist}>
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className={styles.dropdownItem}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemPrice}>
                      Rs. {item.price.toLocaleString()}.00
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.id);
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {wishlistItems.length > 0 && (
            <div className={styles.dropdownActions}>
              <Link to="/wishlist" className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                <i className="bi bi-heart"></i>
                <span>View Wishlist</span>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistDropdown; 