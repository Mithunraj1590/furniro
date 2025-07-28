import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import styles from './ourProducts.module.scss';

const OurProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const products = getAllProducts();

  const handleShowMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, products.length));
  };

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
    // Here you would typically add the product to cart
  };

  const handleShare = (productId) => {
    console.log('Share product:', productId);
    // Here you would typically implement sharing functionality
  };

  const handleCompare = (productId) => {
    console.log('Compare product:', productId);
    // Here you would typically implement comparison functionality
  };

  const handleLike = (productId) => {
    console.log('Like product:', productId);
    // Here you would typically implement wishlist functionality
  };

  const containerVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.99],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
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
    <section className={styles.ourProducts}>
      <div className="container">
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className={styles.title}
            variants={itemVariants}
          >
            Our Products
          </motion.h2>
        </motion.div>

        <motion.div 
          className={styles.productsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="row row-gap-3 row-gap-lg-4">
            {products.slice(0, visibleProducts).map((product, index) => (
              <motion.div
                key={product.id}
                className="col-12 col-sm-6 col-lg-3"
                variants={itemVariants}
                custom={index}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onShare={handleShare}
                  onCompare={handleCompare}
                  onLike={handleLike}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {visibleProducts < products.length && (
          <motion.div 
            className={styles.showMoreContainer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }}
          >
            <button 
              className="btn btn-primary"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurProducts; 