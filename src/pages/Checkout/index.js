import React from 'react';
import { motion } from 'framer-motion';
import ShopBanner from '../../widgets/ShopBanner';
import CheckoutForm from '../../widgets/CheckoutForm';
import styles from './checkout.module.scss';
import { Helmet } from 'react-helmet-async';

const Checkout = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const checkoutBannerData = {
    title: "Checkout",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Cart", path: "/cart" }
    ],
    currentPage: "Checkout"
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Ecom Store</title>
        <meta name="description" content="Complete your purchase securely at Ecom Store. Fast checkout and multiple payment options available." />
        <link rel="canonical" href="/checkout" />
      </Helmet>
      <motion.div 
        className={styles.checkoutPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...checkoutBannerData} />
        <CheckoutForm />
      </motion.div>
    </>
  );
};

export default Checkout; 