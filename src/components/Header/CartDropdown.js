import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/cartSlice';
import styles from './header.module.scss';

const CartDropdown = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { items: cartItems, total } = useSelector((state) => state.cart);

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
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
                        <h4>Shopping Cart</h4>
                        <div className={styles.cartIcon}>
                            <i className="bi bi-bag"></i>
                        </div>
                    </div>

                    <div className={styles.dropdownItems}>
                        {cartItems.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className={styles.dropdownItem}>
                                    <div className={styles.itemImage}>
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemName}>{item.name}</div>
                                        <div className={styles.itemPrice}>
                                            <span className={styles.quantity}>{item.quantity} x</span>
                                            <span className={styles.price}>Rs. {item.price.toLocaleString()}.00</span>
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

                    {cartItems.length > 0 && (
                        <>
                            <div className={styles.subtotal}>
                                <span className={styles.subtotalLabel}>Subtotal</span>
                                <span className={styles.subtotalAmount}>Rs. {total.toLocaleString()}.00</span>
                            </div>

                            <div className={styles.dropdownActions}>
                                <Link to="/cart" className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                                    <i className="bi bi-cart"></i>
                                    <span>Cart</span>
                                </Link>
                                <Link to="/checkout" className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                                    <i className="bi bi-credit-card"></i>
                                    <span>Checkout</span>
                                </Link>
                                <Link to="/comparison" className={styles.actionButton} onClick={(e) => e.stopPropagation()}>
                                    <i className="bi bi-arrow-left-right"></i>
                                    <span>Comparison</span>
                                </Link>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartDropdown; 