import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './faq.module.scss';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

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

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Funiro?',
          answer: 'Funiro is a premium furniture and home decor retailer offering high-quality, stylish furniture for every room in your home. We specialize in modern, contemporary, and classic designs that combine comfort, functionality, and aesthetic appeal.'
        },
        {
          question: 'Where are you located?',
          answer: 'Our main showroom is located at 400 University Drive Suite 200, Coral Gables, FL 33134 USA. We also have an extensive online presence serving customers nationwide.'
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we offer international shipping to select countries. Shipping rates and delivery times vary by location. Please contact our customer service team for specific details about shipping to your country.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and gift cards. We also offer financing options for qualifying purchases.'
        }
      ]
    },
    {
      category: 'Products',
      questions: [
        {
          question: 'What materials do you use in your furniture?',
          answer: 'We use a variety of high-quality materials including solid wood, engineered wood, premium fabrics, genuine leather, and metal. All materials are carefully selected for durability, comfort, and style. Each product page includes detailed material information.'
        },
        {
          question: 'Are your products customizable?',
          answer: 'Many of our products offer customization options including fabric selection, color choices, and size variations. Custom orders may require additional lead time. Contact our customer service team for specific customization options.'
        },
        {
          question: 'Do you offer assembly services?',
          answer: 'Yes, we offer professional assembly services for most furniture items. Assembly can be scheduled during checkout or by contacting our customer service team. Some items may require professional installation.'
        },
        {
          question: 'How do I care for my furniture?',
          answer: 'Care instructions vary by material. We provide detailed care instructions with each purchase. Generally, regular dusting, avoiding direct sunlight, and using appropriate cleaning products will help maintain your furniture\'s appearance and longevity.'
        }
      ]
    },
    {
      category: 'Orders & Shipping',
      questions: [
        {
          question: 'How long does shipping take?',
          answer: 'Shipping times vary by location and shipping method. Standard shipping typically takes 5-7 business days, express shipping takes 2-3 business days, and next-day delivery is available in select areas. You\'ll receive tracking information once your order ships.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes, you can track your order using the tracking number provided in your shipping confirmation email. You can also track your order by logging into your account and viewing your order history.'
        },
        {
          question: 'What if my order arrives damaged?',
          answer: 'If your order arrives damaged, please take photos and contact our customer service team within 48 hours of delivery. We\'ll arrange for a replacement or refund. Do not accept damaged items from the delivery driver.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes, we offer free standard shipping on orders over $100. Free express shipping is available on orders over $200. Shipping costs are clearly displayed during checkout.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for most items. Items must be in original condition with all packaging and tags. Some items may have different return policies due to their nature. Please review our complete return policy for details.'
        },
        {
          question: 'How do I return an item?',
          answer: 'To return an item, log into your account, go to your order history, and click "Return Item" next to the order. Follow the prompts to select items and provide a reason. We\'ll provide a free return shipping label.'
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Refunds are typically processed within 3-5 business days after we receive your return. The time it takes for the refund to appear on your statement depends on your bank or credit card company.'
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes, you can request an exchange during the return process. We\'ll ship the new item once we receive your return. Exchanges are subject to availability and may require additional shipping costs.'
        }
      ]
    },
    {
      category: 'Customer Service',
      questions: [
        {
          question: 'How can I contact customer service?',
          answer: 'You can contact our customer service team by phone at +1 (555) 123-4567, email at hello@funiro.com, or through our online chat system. Our team is available Monday through Friday, 9 AM to 6 PM EST.'
        },
        {
          question: 'Do you offer design consultation services?',
          answer: 'Yes, we offer complimentary design consultation services. Our experienced designers can help you choose the perfect furniture for your space, create room layouts, and provide styling advice. Contact us to schedule a consultation.'
        },
        {
          question: 'What if I need help with assembly?',
          answer: 'If you need help with assembly, we offer professional assembly services. You can also contact our customer service team for guidance, or refer to our detailed assembly instructions available online.'
        },
        {
          question: 'Do you have a warranty on your products?',
          answer: 'Yes, most of our products come with a manufacturer\'s warranty. Warranty terms vary by product and are clearly stated on each product page. We also offer extended warranty options for additional protection.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newOpenItems = new Set(openItems);
    
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Ecom Store</title>
        <meta name="description" content="Frequently asked questions about Ecom Store, shipping, returns, and more." />
        <link rel="canonical" href="/faq" />
      </Helmet>
      <div className={styles.faqPage}>
        <Breadcrumb />
        
        <motion.section 
          className={styles.heroSection}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="container">
            <motion.h1 variants={itemVariants}>Frequently Asked Questions</motion.h1>
            <motion.p variants={itemVariants}>
              Find answers to common questions about our products, services, and policies.
            </motion.p>
          </div>
        </motion.section>

        <section className={styles.contentSection}>
          <div className="container">
            {/* Search Section */}
            <motion.div 
              className={styles.searchSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Search FAQ</motion.h2>
              <motion.div className={styles.searchBox} variants={itemVariants}>
                <i className="bi bi-search"></i>
                <input 
                  type="text" 
                  placeholder="Search for questions..." 
                  className={styles.searchInput}
                />
              </motion.div>
            </motion.div>

            {/* FAQ Categories */}
            <motion.div 
              className={styles.faqCategories}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {faqData.map((category, categoryIndex) => (
                <motion.div 
                  key={category.category}
                  className={styles.categorySection}
                  variants={itemVariants}
                >
                  <h3 className={styles.categoryTitle}>{category.category}</h3>
                  <div className={styles.questionsList}>
                    {category.questions.map((item, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`;
                      const isOpen = openItems.has(key);
                      
                      return (
                        <motion.div 
                          key={questionIndex}
                          className={styles.questionItem}
                          initial={false}
                        >
                          <button
                            className={`${styles.questionButton} ${isOpen ? styles.active : ''}`}
                            onClick={() => toggleItem(categoryIndex, questionIndex)}
                          >
                            <span className={styles.questionText}>{item.question}</span>
                            <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                className={styles.answerContent}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                              >
                                <div className={styles.answerText}>
                                  {item.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              className={styles.contactSection}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2 variants={itemVariants}>Still Have Questions?</motion.h2>
              <motion.p variants={itemVariants}>
                Can't find what you're looking for? Our customer service team is here to help.
              </motion.p>
              <motion.div className={styles.contactGrid} variants={itemVariants}>
                <div className={styles.contactCard}>
                  <i className="bi bi-telephone"></i>
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                  <span>Monday - Friday, 9 AM - 6 PM EST</span>
                </div>
                <div className={styles.contactCard}>
                  <i className="bi bi-envelope"></i>
                  <h4>Email Us</h4>
                  <p>hello@funiro.com</p>
                  <span>We'll respond within 24 hours</span>
                </div>
                <div className={styles.contactCard}>
                  <i className="bi bi-chat-dots"></i>
                  <h4>Live Chat</h4>
                  <p>Available during business hours</p>
                  <span>Get instant help from our team</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ; 