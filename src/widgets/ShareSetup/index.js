import React from 'react';
import { motion } from 'framer-motion';
import styles from './shareSetup.module.scss';

const ShareSetup = () => {
    const setupImages = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
            category: 'Living Area',
            title: 'Bright Minimalist'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
            category: 'Home Office',
            title: 'Study Desk'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
            category: 'Dining Area',
            title: 'Sunlit Dining'
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
            category: 'Dining Room',
            title: 'Modern Dining'
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=400&fit=crop',
            category: 'Bedroom',
            title: 'Luxury Bedroom'
        },
        {
            id: 6,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
            category: 'Bedroom',
            title: 'Simple Bedroom'
        },
        {
            id: 7,
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
            category: 'Decor',
            title: 'Vase & Camera'
        },
        {
            id: 8,
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
            category: 'Wall Decor',
            title: 'Framed Art'
        },
        {
            id: 9,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
            category: 'Kitchen',
            title: 'Kitchen Wall'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
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
        hidden: { opacity: 0, y: 30 },
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

    const gridVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: 0.4,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.6, 0.05, 0.01, 0.99]
            }
        }
    };

    return (
        <section className={styles.shareSetup}>
            <div className={styles.headerContainer}>
                <motion.div
                    className={styles.header}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h4
                        className={`h4 ${styles.title}`}
                        variants={textVariants}
                    >
                        Share your setup with
                    </motion.h4>
                    <motion.h2
                        className={`h2 ${styles.hashtag}`}
                        variants={textVariants}
                    >
                        #FuniroFurniture
                    </motion.h2>
                </motion.div>
            </div>

            <motion.div
                className={styles.gridContainer}
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className={styles.bentoGrid}>
                    {/* Image 1: Top-left photo (Vertical) - Bright minimalist room */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item1}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[0].image} 
                                alt={setupImages[0].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 2: Top-middle photo (Horizontal) - White desk */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item2}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[1].image} 
                                alt={setupImages[1].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 3: Top-right photo (Vertical) - Sunlit dining area */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item3}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[2].image} 
                                alt={setupImages[2].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 4: Middle-left photo (Vertical) - Modern dining room */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item4}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[3].image} 
                                alt={setupImages[3].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 5: Middle-right photo (Vertical) - Luxury bedroom */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item5}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[4].image} 
                                alt={setupImages[4].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 6: Bottom-left photo (Horizontal) - Simple bedroom */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item6}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[5].image} 
                                alt={setupImages[5].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 7: Bottom-middle photo (Horizontal) - Vase & Camera */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item7}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[6].image} 
                                alt={setupImages[6].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 8: Bottom-right-left photo (Vertical) - Framed picture and vase */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item8}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[7].image} 
                                alt={setupImages[7].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Image 9: Bottom-right-right photo (Vertical) - Kitchen wall */}
                    <motion.div 
                        className={`${styles.bentoItem} ${styles.item9}`}
                        variants={itemVariants}
                    >
                        <div className={styles.imageContainer}>
                            <img 
                                src={setupImages[8].image} 
                                alt={setupImages[8].title} 
                                className={styles.setupImage}
                                loading="lazy"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ShareSetup; 