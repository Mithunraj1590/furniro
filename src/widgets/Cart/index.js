import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './cart.module.scss';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Asgaard sofa',
            price: 250000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop'
        },
        {
            id: 2,
            name: 'Casaliving Wood',
            price: 270000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop'
        }
    ]);

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(cartItems.map(item => 
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <section className={styles.cart}>
            <div className="container">
                <motion.div
                    className={styles.cartContainer}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <div className={styles.header}>
                        <h1 className={styles.title}>Shopping Cart</h1>
                        <div className={styles.cartIcon}>
                            <i className="bi bi-bag"></i>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className={styles.cartItems}>
                        {cartItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className={styles.cartItem}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={styles.itemImage}>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                
                                <div className={styles.itemDetails}>
                                    <h3 className={styles.itemName}>{item.name}</h3>
                                    <div className={styles.itemPrice}>
                                        <span className={styles.quantity}>{item.quantity} x</span>
                                        <span className={styles.price}>Rs. {item.price.toLocaleString()}.00</span>
                                    </div>
                                </div>

                                <button
                                    className={styles.removeButton}
                                    onClick={() => removeItem(item.id)}
                                    aria-label={`Remove ${item.name} from cart`}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Subtotal */}
                    <div className={styles.subtotal}>
                        <span className={styles.subtotalLabel}>Subtotal</span>
                        <span className={styles.subtotalAmount}>Rs. {subtotal.toLocaleString()}.00</span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className={styles.navigation}>
                        <Link to="/" className={styles.navButton}>
                            <i className="bi bi-cart"></i>
                            <span>Cart</span>
                        </Link>
                        <Link to="/checkout" className={styles.navButton}>
                            <i className="bi bi-credit-card"></i>
                            <span>Checkout</span>
                        </Link>
                        <Link to="/comparison" className={styles.navButton}>
                            <i className="bi bi-arrow-left-right"></i>
                            <span>Comparison</span>
                        </Link>
                    </div>

                    {/* Empty State */}
                    {cartItems.length === 0 && (
                        <motion.div
                            className={styles.emptyState}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className={styles.emptyIcon}>
                                <i className="bi bi-cart-x"></i>
                            </div>
                            <h3>Your cart is empty</h3>
                            <p>Add some products to get started!</p>
                            <Link to="/shop" className={styles.shopButton}>
                                Continue Shopping
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Cart; 