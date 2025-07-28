import React from 'react';
import { motion } from 'framer-motion';
import ShopBanner from '../../widgets/ShopBanner';
import ContactForm from '../../widgets/ContactForm';
import styles from './contact.module.scss';
import Features from '../../components/Features';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const contactBannerData = {
    title: "Contact Us",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" }
    ],
    currentPage: "Contact"
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Ecom Store</title>
        <meta name="description" content="Contact Ecom Store for product inquiries, support, or feedback. We're here to help you!" />
        <link rel="canonical" href="/contact" />
      </Helmet>
      <motion.div 
        className={styles.contactPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...contactBannerData} />
        <ContactForm />
        <Features />
      </motion.div>
    </>
  );
};

export default Contact;