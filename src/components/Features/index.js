import React from 'react';
import styles from './features.module.scss';

const Features = () => {
  const features = [
    {
      icon: 'bi bi-trophy',
      title: 'High Quality',
      description: 'crafted from top materials'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Warranty Protection',
      description: 'Over 2 years'
    },
    {
      icon: 'bi bi-box-seam',
      title: 'Free Shipping',
      description: 'Order over 150 $'
    },
    {
      icon: 'bi bi-headset',
      title: '24 / 7 Support',
      description: 'Dedicated support'
    }
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <i className={feature.icon}></i>
              </div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 