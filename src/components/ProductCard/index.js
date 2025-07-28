import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/wishlistSlice';
import NotificationPopup from '../NotificationPopup';
import useNotification from '../../hooks/useNotification';
import styles from './productCard.module.scss';

const ProductCard = ({
  product,
  onShare,
  onCompare,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { notification, showNotification, hideNotification } = useNotification();

  // Check if product is in wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isLiked = wishlistItems.some(item => item.id === product.id);

  const handleLike = () => {
    if (isLiked) {
      dispatch(removeFromWishlist(product.id));
      showNotification(`${product.name} has been removed from your wishlist.`, 'info');
    } else {
      // Format the product data for wishlist
      const wishlistItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        detail: product.detail
      };
      dispatch(addToWishlist(wishlistItem));
      showNotification(`${product.name} has been added to your wishlist!`, 'success');
    }
  };

  const handleAddToCart = () => {
    // Format the product data for cart
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      detail: product.detail
    };

    dispatch(addToCart(cartItem));
    showNotification(`${product.name} has been added to your cart!`, 'success');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 }
  };

  return (
    <>
      <motion.div
        className={styles.productCard}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className={styles.imageContainer}>
          <Link to={`/product/${product.id}`} className={styles.imageLink}>
            <motion.img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              variants={imageVariants}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Badge */}
          {product.badge && (
            <div className={`${styles.badge} ${styles[product.badge.type]}`}>
              {product.badge.text}
            </div>
          )}

          {/* Action Buttons */}
          <div className={`${styles.actionButtons} ${isHovered ? styles.visible : ''}`}>
            <button
              className={styles.actionButton}
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <i className="bi bi-cart"></i>
            </button>
            
            <button
              className={styles.actionButton}
              onClick={handleLike}
              title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            </button>
            
            {onShare && (
              <button
                className={styles.actionButton}
                onClick={() => onShare(product)}
                title="Share"
              >
                <i className="bi bi-share"></i>
              </button>
            )}
            
            {onCompare && (
              <button
                className={styles.actionButton}
                onClick={() => onCompare(product)}
                title="Compare"
              >
                <i className="bi bi-arrow-left-right"></i>
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          <Link to={`/product/${product.id}`} className={styles.productNameLink}>
            <h3 className={styles.productName}>{product.name}</h3>
          </Link>
          
          <p className={styles.productDescription}>{product.detail}</p>
          
          <div className={styles.productPrice}>
            <span className={styles.currentPrice}>
              Rs. {product.price.toLocaleString()}.00
            </span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                Rs. {product.originalPrice.toLocaleString()}.00
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <NotificationPopup
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        duration={notification.duration}
        onClose={hideNotification}
      />
    </>
  );
};

export default ProductCard; 