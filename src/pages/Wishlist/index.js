import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../../store/wishlistSlice';
import { addToCart } from '../../store/cartSlice';
import ShopBanner from '../../widgets/ShopBanner';
import NotificationPopup from '../../components/NotificationPopup';
import useNotification from '../../hooks/useNotification';
import styles from './wishlist.module.scss';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { notification, showNotification, hideNotification } = useNotification();

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      detail: item.description,
      quantity: 1
    };
    dispatch(addToCart(cartItem));
    showNotification(`${item.name} has been added to your cart!`, 'success');
  };

  const handleRemoveFromWishlist = (itemId) => {
    const item = wishlistItems.find(item => item.id === itemId);
    dispatch(removeFromWishlist(itemId));
    showNotification(`${item.name} has been removed from your wishlist.`, 'info');
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    showNotification('Your wishlist has been cleared.', 'info');
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const wishlistBannerData = {
    title: "Wishlist",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" }
    ],
    currentPage: "Wishlist"
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div 
        className={styles.wishlistPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...wishlistBannerData} />
        <section className='pt-5'>
          <div className="container">
            <div className={styles.emptyWishlist}>
              <div className={styles.emptyWishlistIcon}>
                <i className="bi bi-heart"></i>
              </div>
              <h2>Your wishlist is empty</h2>
              <p>Looks like you haven't added any items to your wishlist yet.</p>
              <Link to="/shop" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          </div>
        </section>
        <NotificationPopup
          isVisible={notification.isVisible}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={hideNotification}
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.wishlistPage}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <ShopBanner {...wishlistBannerData} />
      <section className='py-5'>
        <div className="container">
          <div className={styles.wishlistHeader}>
            <div>
              <h1>My Wishlist</h1>
              <p>You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist</p>
            </div>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={handleClearWishlist}
            >
              Clear Wishlist
            </button>
          </div>

          <div className={styles.wishlistGrid}>
            {wishlistItems.map((item) => (
              <motion.div 
                key={item.id} 
                className={styles.wishlistItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title="Remove from wishlist"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <div className={styles.itemPrice}>
                    Rs. {item.price.toLocaleString()}.00
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <Link to={`/product/${item.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.wishlistFooter}>
            <Link to="/shop" className="btn btn-outline-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
      <NotificationPopup
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        duration={notification.duration}
        onClose={hideNotification}
      />
    </motion.div>
  );
};

export default Wishlist; 