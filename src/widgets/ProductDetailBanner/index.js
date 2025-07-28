import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import styles from './productDetailBanner.module.scss';

const ProductDetailBanner = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const dispatch = useDispatch();

  // Initialize selected size and color if not set
  React.useEffect(() => {
    if (product && !selectedSize && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.selectedSize || product.sizes[0]);
    }
    if (product && !selectedColor && product.colors && product.colors.length > 0) {
      setSelectedColor(product.selectedColor || product.colors[0]);
    }
  }, [product, selectedSize, selectedColor]);

  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      selectedSize,
      selectedColor,
      quantity
    };
    
    dispatch(addToCart(cartItem));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const bannerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section 
      className={styles.productDetailBanner}
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <div className={styles.bannerContent}>
          {/* Left Side - Product Images */}
          <div className={styles.imageSection}>
            {/* Thumbnail Images */}
            <div className={styles.thumbnailColumn}>
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className={styles.mainImageContainer}>
              <div className={styles.mainImage}>
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                />
                {product.badge && (
                  <div className={`${styles.badge} ${styles[product.badge.type]}`}>
                    {product.badge.text}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className={styles.productInfoSection}>
            <h1 className={`h1 ${styles.productName}`}>{product.name}</h1>
            
            <div className={styles.productPrice}>
              <span className={styles.currentPrice}>
                Rs. {product.price.toLocaleString()}.00
              </span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>
                  Rs. {product.originalPrice.toLocaleString()}.00
                </span>
              )}
            </div>

            <div className={styles.productRating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'}`}
                  ></i>
                ))}
              </div>
              <span className={styles.ratingText}>
                {product.rating} ({product.reviews} Customer Review{product.reviews !== 1 ? 's' : ''})
              </span>
            </div>

            <p className={styles.productDetail}>{product.detail || product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>Size:</label>
                <div className={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`${styles.sizeOption} ${selectedSize === size ? styles.selected : ''}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className={styles.selectionGroup}>
                <label className={styles.selectionLabel}>Color:</label>
                <div className={styles.colorOptions}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: getColorValue(color) }}
                      title={color}
                    >
                      {selectedColor === color && <i className="bi bi-check"></i>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={styles.quantitySelector}>
              <label>Quantity:</label>
              <div className={styles.quantityControls}>
                <button 
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button 
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
              <button 
                className="btn btn-outline-primary btn-lg"
                onClick={() => {
                  // Handle compare functionality
                  console.log('Compare product:', product.name);
                }}
              >
                <i className="bi bi-arrow-left-right"></i>
                Compare
              </button>
            </div>

            {/* Product Information */}
            <div className={styles.productInfoSection}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>SKU:</span>
                <span className={styles.infoValue}>{product.sku}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Category:</span>
                <span className={styles.infoValue}>{product.category}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tags:</span>
                <span className={styles.infoValue}>{product.tags.join(', ')}</span>
              </div>
            </div>

            {/* Share Options */}
            <div className={styles.shareSection}>
              <label className={styles.shareLabel}>Share:</label>
              <div className={styles.shareButtons}>
                <button className={styles.shareBtn} title="Share on Facebook">
                  <i className="bi bi-facebook"></i>
                </button>
                <button className={styles.shareBtn} title="Share on LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </button>
                <button className={styles.shareBtn} title="Share on Twitter">
                  <i className="bi bi-twitter"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Helper function to get color values
const getColorValue = (colorName) => {
  const colorMap = {
    'Purple': '#6f42c1',
    'Black': '#000000',
    'Gold': '#ffd700',
    'White': '#ffffff',
    'Gray': '#6c757d',
    'Beige': '#f5f5dc',
    'Navy': '#000080',
    'Silver': '#c0c0c0',
    'Brown': '#8b4513'
  };
  return colorMap[colorName] || '#cccccc';
};

export default ProductDetailBanner; 