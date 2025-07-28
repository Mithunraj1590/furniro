import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './shopBanner.module.scss';

const ShopBanner = ({ 
  title = "Shop", 
  backgroundImage = "/banner.png",
  breadcrumbs = [{ name: "Home", path: "/" }],
  currentPage = "Shop"
}) => {
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

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: 0.2,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <section className={styles.shopBanner}>
            <motion.div
                className={styles.bannerContainer}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div 
                    className={styles.backgroundImage}
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className={styles.blurredBackground}></div>
                </div>
                
                <div className={styles.content}>
                    <motion.h1
                        className={`h1 ${styles.mainTitle}`}
                        variants={textVariants}
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        className={styles.breadcrumb}
                        variants={textVariants}
                    >
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                <Link to={crumb.path} className={styles.breadcrumbLink}>
                                    {crumb.name}
                                </Link>
                                {index < breadcrumbs.length - 1 && (
                                    <span className={styles.breadcrumbSeparator}> &gt; </span>
                                )}
                            </React.Fragment>
                        ))}
                        <span className={styles.breadcrumbSeparator}> &gt; </span>
                        <span className={styles.currentPage}>{currentPage}</span>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ShopBanner; 