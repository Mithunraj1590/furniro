import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import Breadcrumb from '../../components/Breadcrumb';
import Features from '../../components/Features';
import styles from './cart.module.scss';
import ShopBanner from '../../widgets/ShopBanner';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, total } = useSelector((state) => state.cart);

  console.log(cartItems,"items");
  

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    dispatch(updateQuantity({ itemId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cartBannerData = {
    title: "Cart",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" }
    ],
    currentPage: "Cart"
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart | Ecom Store</title>
          <meta name="description" content="View and manage the items in your shopping cart at Ecom Store." />
          <link rel="canonical" href="/cart" />
        </Helmet>
        <motion.div 
          className={styles.cartPage}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <ShopBanner {...cartBannerData}/>
          <section className='py-5'>
          <div className="container">
            <div className={styles.emptyCart}>
              <div className={styles.emptyCartIcon}>
                <i className="bi bi-cart-x"></i>
              </div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
          </section>
          <Features />
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart | Ecom Store</title>
        <meta name="description" content="View and manage the items in your shopping cart at Ecom Store." />
        <link rel="canonical" href="/cart" />
      </Helmet>
      <motion.div 
        className={styles.cartPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...cartBannerData}/>
        <section className='py-5'>
        <div className="container">
          {/* <div className={styles.cartHeader}>
            <h1>Shopping Cart</h1>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div> */}

          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cartItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className={styles.cartItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemDescription}>{item.detail}</p>
                    <div className={styles.itemPrice}>
                      Rs. {item.price.toLocaleString()}.00
                    </div>
                  </div>

                  <div className={styles.itemQuantity}>
                    <label>Quantity:</label>
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.quantityBtn}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button 
                        className={styles.quantityBtn}
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemTotal}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span className={styles.totalAmount}>
                      Rs. {(item.price * item.quantity).toLocaleString()}.00
                    </span>
                  </div>

                  <button 
                    className={styles.removeBtn}
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.summaryHeader}>
                <h3>Order Summary</h3>
              </div>
              
              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>Rs. {total.toLocaleString()}.00</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax:</span>
                  <span>Rs. {(total * 0.1).toLocaleString()}.00</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total:</span>
                  <span>Rs. {(total * 1.1).toLocaleString()}.00</span>
                </div>
              </div>

              <div className={styles.summaryActions}>
                <Link to="/checkout" className="btn btn-primary btn-lg w-100 mb-3">
                  Proceed to Checkout
                </Link>
                <Link to="/shop" className="btn btn-outline-secondary w-100">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        </section>
        <Features />
      </motion.div>
    </>
  );
};

export default Cart; 