import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './support.module.scss';
import { Helmet } from 'react-helmet-async';

const Support = () => {
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    category: 'general'
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      orderNumber: '',
      category: 'general'
    });
  };

  const supportCategories = [
    { id: 'general', name: 'General Inquiry', icon: 'bi-question-circle' },
    { id: 'order', name: 'Order Support', icon: 'bi-cart' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: 'bi-truck' },
    { id: 'returns', name: 'Returns & Refunds', icon: 'bi-arrow-return-left' },
    { id: 'technical', name: 'Technical Support', icon: 'bi-tools' },
    { id: 'product', name: 'Product Information', icon: 'bi-info-circle' }
  ];

  return (
    <>
      <Helmet>
        <title>Support | Ecom Store</title>
        <meta name="description" content="Get support and help for your Ecom Store orders, products, and account." />
        <link rel="canonical" href="/support" />
      </Helmet>
      <div className={styles.supportPage}>
        <Breadcrumb />
        
        <motion.section 
          className={styles.heroSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container">
            <motion.h1 variants={itemVariants}>Customer Support</motion.h1>
            <motion.p variants={itemVariants}>
              We're here to help! Get in touch with our support team for assistance with your orders, products, or any questions you may have.
            </motion.p>
          </div>
        </motion.section>

        <section className={styles.contentSection}>
          <div className="container">
            {/* Quick Support Options */}
            <motion.div 
              className={styles.quickSupport}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Quick Support Options</motion.h2>
              <motion.div className={styles.supportGrid} variants={itemVariants}>
                <div className={styles.supportCard}>
                  <i className="bi bi-telephone"></i>
                  <h4>Call Us</h4>
                  <p>Speak directly with our support team</p>
                  <a href="tel:+15551234567" className={styles.supportLink}>
                    +1 (555) 123-4567
                  </a>
                  <span>Mon-Fri, 9 AM - 6 PM EST</span>
                </div>
                <div className={styles.supportCard}>
                  <i className="bi bi-chat-dots"></i>
                  <h4>Live Chat</h4>
                  <p>Get instant help from our team</p>
                  <button className={styles.supportButton}>
                    Start Chat
                  </button>
                  <span>Available during business hours</span>
                </div>
                <div className={styles.supportCard}>
                  <i className="bi bi-envelope"></i>
                  <h4>Email Support</h4>
                  <p>Send us a detailed message</p>
                  <a href="mailto:hello@funiro.com" className={styles.supportLink}>
                    hello@funiro.com
                  </a>
                  <span>Response within 24 hours</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Support Categories */}
            <motion.div 
              className={styles.supportCategories}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>What Can We Help You With?</motion.h2>
              <motion.div className={styles.categoriesGrid} variants={itemVariants}>
                {supportCategories.map((category) => (
                  <div key={category.id} className={styles.categoryCard}>
                    <i className={category.icon}></i>
                    <h4>{category.name}</h4>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div 
              className={styles.contactSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className={styles.tabNavigation} variants={itemVariants}>
                <button
                  className={`${styles.tabButton} ${activeTab === 'contact' ? styles.active : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact Form
                </button>
                <button
                  className={`${styles.tabButton} ${activeTab === 'faq' ? styles.active : ''}`}
                  onClick={() => setActiveTab('faq')}
                >
                  Quick FAQ
                </button>
              </motion.div>

              <motion.div className={styles.tabContent} variants={itemVariants}>
                {activeTab === 'contact' && (
                  <div className={styles.contactForm}>
                    <h3>Send Us a Message</h3>
                    <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                    
                    <form onSubmit={handleSubmit} className={styles.form}>
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="name">Full Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor="email">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="category">Support Category</label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                          >
                            <option value="general">General Inquiry</option>
                            <option value="order">Order Support</option>
                            <option value="shipping">Shipping & Delivery</option>
                            <option value="returns">Returns & Refunds</option>
                            <option value="technical">Technical Support</option>
                            <option value="product">Product Information</option>
                          </select>
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor="orderNumber">Order Number (if applicable)</label>
                          <input
                            type="text"
                            id="orderNumber"
                            name="orderNumber"
                            value={formData.orderNumber}
                            onChange={handleInputChange}
                            placeholder="e.g., ORD-123456"
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="subject">Subject *</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="message">Message *</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="6"
                          required
                          placeholder="Please describe your issue or question in detail..."
                        ></textarea>
                      </div>

                      <button type="submit" className={styles.submitButton}>
                        Send Message
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'faq' && (
                  <div className={styles.quickFaq}>
                    <h3>Frequently Asked Questions</h3>
                    <div className={styles.faqList}>
                      <div className={styles.faqItem}>
                        <h4>How can I track my order?</h4>
                        <p>You can track your order using the tracking number provided in your shipping confirmation email, or by logging into your account and viewing your order history.</p>
                      </div>
                      <div className={styles.faqItem}>
                        <h4>What is your return policy?</h4>
                        <p>We offer a 30-day return policy for most items. Items must be in original condition with all packaging and tags. Some items may have different return policies.</p>
                      </div>
                      <div className={styles.faqItem}>
                        <h4>Do you offer assembly services?</h4>
                        <p>Yes, we offer professional assembly services for most furniture items. Assembly can be scheduled during checkout or by contacting our customer service team.</p>
                      </div>
                      <div className={styles.faqItem}>
                        <h4>How long does shipping take?</h4>
                        <p>Shipping times vary by location and shipping method. Standard shipping typically takes 5-7 business days, express shipping takes 2-3 business days.</p>
                      </div>
                    </div>
                    <div className={styles.faqFooter}>
                      <p>Can't find what you're looking for?</p>
                      <button 
                        className={styles.faqButton}
                        onClick={() => setActiveTab('contact')}
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Office Information */}
            <motion.div 
              className={styles.officeInfo}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Visit Our Office</motion.h2>
              <motion.div className={styles.officeGrid} variants={itemVariants}>
                <div className={styles.officeCard}>
                  <h4>Main Office</h4>
                  <div className={styles.officeDetails}>
                    <p><i className="bi bi-geo-alt"></i> 400 University Drive Suite 200<br />Coral Gables, FL 33134 USA</p>
                    <p><i className="bi bi-telephone"></i> +1 (555) 123-4567</p>
                    <p><i className="bi bi-envelope"></i> hello@funiro.com</p>
                  </div>
                  <div className={styles.officeHours}>
                    <h5>Business Hours</h5>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div className={styles.officeCard}>
                  <h4>Showroom</h4>
                  <div className={styles.officeDetails}>
                    <p><i className="bi bi-geo-alt"></i> 400 University Drive Suite 200<br />Coral Gables, FL 33134 USA</p>
                    <p><i className="bi bi-telephone"></i> +1 (555) 123-4568</p>
                    <p><i className="bi bi-envelope"></i> showroom@funiro.com</p>
                  </div>
                  <div className={styles.officeHours}>
                    <h5>Showroom Hours</h5>
                    <p>Monday - Friday: 10:00 AM - 8:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 6:00 PM EST</p>
                    <p>Sunday: 12:00 PM - 5:00 PM EST</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Support; 