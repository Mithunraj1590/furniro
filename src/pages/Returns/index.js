import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './returns.module.scss';
import { Helmet } from 'react-helmet-async';

const Returns = () => {
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
        <title>Returns Policy | Ecom Store</title>
        <meta name="description" content="Learn about Ecom Store's returns policy and how to return your items." />
        <link rel="canonical" href="/returns" />
      </Helmet>
      <motion.div
        className={styles.returnsPage}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumb />
        
        <motion.section 
          className={styles.heroSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container">
            <motion.h1 variants={itemVariants}>Returns & Refunds</motion.h1>
            <motion.p variants={itemVariants}>
              Hassle-free returns and refunds. We want you to be completely satisfied with your purchase.
            </motion.p>
          </div>
        </motion.section>

        <section className={styles.contentSection}>
          <div className="container">
            {/* Return Policy Overview */}
            <motion.div 
              className={styles.policyOverview}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Our Return Policy</motion.h2>
              <motion.div className={styles.overviewGrid} variants={itemVariants}>
                <div className={styles.overviewCard}>
                  <i className="bi bi-calendar-check"></i>
                  <h4>30-Day Returns</h4>
                  <p>Return any item within 30 days of delivery for a full refund.</p>
                </div>
                <div className={styles.overviewCard}>
                  <i className="bi bi-arrow-return-left"></i>
                  <h4>Free Returns</h4>
                  <p>Free return shipping on all domestic returns.</p>
                </div>
                <div className={styles.overviewCard}>
                  <i className="bi bi-credit-card"></i>
                  <h4>Quick Refunds</h4>
                  <p>Refunds processed within 3-5 business days.</p>
                </div>
                <div className={styles.overviewCard}>
                  <i className="bi bi-shield-check"></i>
                  <h4>Quality Guarantee</h4>
                  <p>We stand behind the quality of all our products.</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Return Process */}
            <motion.div 
              className={styles.returnProcess}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>How to Return an Item</motion.h2>
              <motion.div className={styles.processSteps} variants={itemVariants}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Initiate Return</h4>
                    <p>Log into your account and go to your order history. Click "Return Item" next to the order you want to return.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Select Items</h4>
                    <p>Choose which items you want to return and provide a reason for the return.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Print Label</h4>
                    <p>Print your free return shipping label and securely package your items.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Ship Back</h4>
                    <p>Drop off your package at any authorized shipping location or schedule a pickup.</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>5</div>
                  <div className={styles.stepContent}>
                    <h4>Get Refund</h4>
                    <p>Once we receive your return, we'll process your refund within 3-5 business days.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Return Conditions */}
            <motion.div 
              className={styles.returnConditions}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Return Conditions</motion.h2>
              <motion.div className={styles.conditionsGrid} variants={itemVariants}>
                <div className={styles.conditionCard}>
                  <h4>✅ What We Accept</h4>
                  <ul>
                    <li>Items in original condition</li>
                    <li>Original packaging and tags</li>
                    <li>All original accessories</li>
                    <li>Items within 30 days of delivery</li>
                  </ul>
                </div>
                <div className={styles.conditionCard}>
                  <h4>❌ What We Don't Accept</h4>
                  <ul>
                    <li>Damaged or used items</li>
                    <li>Missing packaging or tags</li>
                    <li>Personalized or custom items</li>
                    <li>Items over 30 days old</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>

            {/* Refund Information */}
            <motion.div 
              className={styles.refundInfo}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Refund Information</motion.h2>
              <motion.div className={styles.refundGrid} variants={itemVariants}>
                <div className={styles.refundCard}>
                  <h4>Refund Timeline</h4>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <span className={styles.time}>1-2 days</span>
                      <span className={styles.description}>Return received and processed</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <span className={styles.time}>3-5 days</span>
                      <span className={styles.description}>Refund issued to original payment method</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <span className={styles.time}>5-10 days</span>
                      <span className={styles.description}>Refund appears on your statement</span>
                    </div>
                  </div>
                </div>
                <div className={styles.refundCard}>
                  <h4>Refund Methods</h4>
                  <ul>
                    <li><strong>Credit/Debit Cards:</strong> Refunded to original card</li>
                    <li><strong>PayPal:</strong> Refunded to PayPal account</li>
                    <li><strong>Gift Cards:</strong> New gift card issued</li>
                    <li><strong>Store Credit:</strong> Added to your account</li>
                  </ul>
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
                  <h4>Can I return an item after 30 days?</h4>
                  <p>We may accept returns after 30 days on a case-by-case basis. Contact our customer service team for assistance.</p>
                </div>
                <div className={styles.faqItem}>
                  <h4>What if my item arrives damaged?</h4>
                  <p>If your item arrives damaged, please take photos and contact us within 48 hours. We'll arrange for a replacement or refund.</p>
                </div>
                <div className={styles.faqItem}>
                  <h4>Do I need to pay for return shipping?</h4>
                  <p>No, we provide free return shipping labels for all domestic returns. International returns may incur shipping costs.</p>
                </div>
                <div className={styles.faqItem}>
                  <h4>Can I exchange an item instead of returning it?</h4>
                  <p>Yes, you can request an exchange during the return process. We'll ship the new item once we receive your return.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Returns; 