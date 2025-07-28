import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './contactForm.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: 'bi bi-geo-alt',
      title: 'Address',
      details: [
        '236 5th SE Avenue, New',
        'York NY10000, United',
        'States'
      ]
    },
    {
      icon: 'bi bi-telephone',
      title: 'Phone',
      details: [
        'Mobile: +(84) 546-6789',
        'Hotline: +(84) 456-6789'
      ]
    },
    {
      icon: 'bi bi-clock',
      title: 'Working Time',
      details: [
        'Monday-Friday: 9:00 - 22:00',
        'Saturday-Sunday: 9:00 - 21:00'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const itemVariants = {
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

  return (
    <section className={styles.contactSection}>
      <div className="container">
        <motion.div
          className={styles.contactHeader}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className={styles.mainTitle}>Get In Touch With Us</h2>
          <p className={styles.subtitle}>
            For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </motion.div>

        <div className={styles.contactContent}>
          {/* Contact Information */}
          <motion.div 
            className={styles.contactInfo}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className={styles.infoItem}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.infoIcon}>
                  <i className={info.icon}></i>
                </div>
                <div className={styles.infoContent}>
                  <h3 className={styles.infoTitle}>{info.title}</h3>
                  <div className={styles.infoDetails}>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={styles.infoText}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={styles.contactForm}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Abc"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Abc@def.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="This is an optional"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi! i'd like to ask about"
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 