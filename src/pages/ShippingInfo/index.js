import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './shippingInfo.module.scss';
import { Helmet } from 'react-helmet-async';

const ShippingInfo = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Shipping Information | Ecom Store</title>
        <meta name="description" content="Find out about shipping options, delivery times, and costs at Ecom Store." />
        <link rel="canonical" href="/shipping-info" />
      </Helmet>
      <div className={styles.shippingInfoPage}>
        <Breadcrumb />
        
        <motion.section 
          className={styles.heroSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container">
            <motion.h1 variants={itemVariants}>Shipping Information</motion.h1>
            <motion.p variants={itemVariants}>
              Get detailed information about our shipping policies, delivery times, and tracking options.
            </motion.p>
          </div>
        </motion.section>

        <section className={styles.contentSection}>
          <div className="container">
            <motion.div 
              className={styles.shippingGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Shipping Methods */}
              <motion.div className={styles.shippingCard} variants={itemVariants}>
                <div className={styles.cardHeader}>
                  <i className="bi bi-truck"></i>
                  <h3>Standard Shipping</h3>
                </div>
                <div className={styles.cardContent}>
                  <p><strong>Delivery Time:</strong> 5-7 business days</p>
                  <p><strong>Cost:</strong> $9.99</p>
                  <p><strong>Free Shipping:</strong> On orders over $100</p>
                  <ul>
                    <li>Track your package with tracking number</li>
                    <li>Delivery confirmation required</li>
                    <li>Available for all US states</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div className={styles.shippingCard} variants={itemVariants}>
                <div className={styles.cardHeader}>
                  <i className="bi bi-lightning"></i>
                  <h3>Express Shipping</h3>
                </div>
                <div className={styles.cardContent}>
                  <p><strong>Delivery Time:</strong> 2-3 business days</p>
                  <p><strong>Cost:</strong> $19.99</p>
                  <p><strong>Free Shipping:</strong> On orders over $200</p>
                  <ul>
                    <li>Priority handling and delivery</li>
                    <li>Real-time tracking updates</li>
                    <li>Signature confirmation available</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div className={styles.shippingCard} variants={itemVariants}>
                <div className={styles.cardHeader}>
                  <i className="bi bi-rocket"></i>
                  <h3>Next Day Delivery</h3>
                </div>
                <div className={styles.cardContent}>
                  <p><strong>Delivery Time:</strong> 1 business day</p>
                  <p><strong>Cost:</strong> $29.99</p>
                  <p><strong>Available:</strong> Select metropolitan areas</p>
                  <ul>
                    <li>Order by 2 PM for next day delivery</li>
                    <li>Premium handling and packaging</li>
                    <li>Signature confirmation included</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Shipping Policies */}
            <motion.div 
              className={styles.policiesSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Shipping Policies</motion.h2>
              
              <motion.div className={styles.policyGrid} variants={itemVariants}>
                <div className={styles.policyItem}>
                  <h4>Processing Time</h4>
                  <p>Orders are typically processed within 1-2 business days. During peak seasons, processing may take 3-5 business days.</p>
                </div>

                <div className={styles.policyItem}>
                  <h4>Tracking Information</h4>
                  <p>You'll receive a tracking number via email once your order ships. Track your package in real-time through our website or carrier's website.</p>
                </div>

                <div className={styles.policyItem}>
                  <h4>Delivery Areas</h4>
                  <p>We ship to all 50 US states, Puerto Rico, and US territories. International shipping is available to select countries.</p>
                </div>

                <div className={styles.policyItem}>
                  <h4>Delivery Issues</h4>
                  <p>If you experience delivery issues, contact our customer service within 48 hours of the expected delivery date.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              className={styles.faqSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Frequently Asked Questions</motion.h2>
              
              <motion.div className={styles.faqList} variants={itemVariants}>
                <div className={styles.faqItem}>
                  <h4>When will my order ship?</h4>
                  <p>Orders are typically shipped within 1-2 business days after payment confirmation. You'll receive a shipping confirmation email with tracking information.</p>
                </div>

                <div className={styles.faqItem}>
                  <h4>How can I track my order?</h4>
                  <p>You can track your order using the tracking number provided in your shipping confirmation email, or by logging into your account and viewing your order history.</p>
                </div>

                <div className={styles.faqItem}>
                  <h4>What if my package is damaged?</h4>
                  <p>If your package arrives damaged, please take photos and contact our customer service within 48 hours. We'll arrange for a replacement or refund.</p>
                </div>

                <div className={styles.faqItem}>
                  <h4>Do you ship internationally?</h4>
                  <p>Yes, we ship to select international destinations. International shipping rates and delivery times vary by location. Contact us for specific details.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShippingInfo; 