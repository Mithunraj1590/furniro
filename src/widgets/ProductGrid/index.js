import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import styles from './productGrid.module.scss';

const ProductGrid = ({
  products = [],
  currentPage = 1,
  itemsPerPage = 16,
  onPageChange,
  viewMode = 'grid',
  currentSort = 'Default',
  filters = {}
}) => {
  // Get all products from service
  const allProducts = getAllProducts();

  // Filter and sort products based on currentSort and filters
  const filteredAndSortedProducts = useMemo(() => {
    let productList = products.length > 0 ? products : allProducts;
    
    console.log('ProductGrid - Initial products:', productList.length);
    console.log('ProductGrid - Current filters:', filters);
    console.log('ProductGrid - Current sort:', currentSort);

    // Apply filters
    if (filters && Object.keys(filters).length > 0) {
      productList = productList.filter(product => {
        // Category filter
        if (filters.categories && filters.categories.length > 0) {
          if (!filters.categories.includes(product.category)) {
            return false;
          }
        }

        // Color filter
        if (filters.colors && filters.colors.length > 0) {
          if (!filters.colors.includes(product.color)) {
            return false;
          }
        }

        // Material filter
        if (filters.materials && filters.materials.length > 0) {
          if (!filters.materials.includes(product.material)) {
            return false;
          }
        }

        // Price range filter
        if (filters.priceRange) {
          const price = product.price;
          const { min, max } = filters.priceRange;

          if (min !== null && price < min) {
            return false;
          }
          if (max !== null && price > max) {
            return false;
          }
        }

        return true;
      });
      
      console.log('ProductGrid - After filtering:', productList.length);
    }

    // Apply sorting
    let sortedProducts;
    switch (currentSort) {
      case 'Price: Low to High':
        sortedProducts = [...productList].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sortedProducts = [...productList].sort((a, b) => b.price - a.price);
        break;
      case 'Name: A to Z':
        sortedProducts = [...productList].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name: Z to A':
        sortedProducts = [...productList].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'Newest First':
        sortedProducts = [...productList].sort((a, b) => b.id - a.id);
        break;
      default:
        sortedProducts = productList;
    }
    
    console.log('ProductGrid - Final filtered and sorted products:', sortedProducts.length);
    return sortedProducts;
  }, [products, currentSort, filters, allProducts]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    onPageChange?.(page);
  };

  const gridVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section className={styles.productGrid}>
     <div className="container">
     <motion.div
        className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}
        variants={gridVariants}
        initial="visible"
        animate="visible"
      >
        {currentProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className={styles.gridItem}
            variants={{
              visible: { opacity: 1, y: 0 }
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationContainer}>
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button
              className={styles.pageButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentProducts.length === 0 && (
        <div className={styles.emptyState}>
          <h3>No products found</h3>
          <p>Try adjusting your filters to see more results.</p>
        </div>
      )}
     </div>
    </section>
  );
};

export default ProductGrid; 