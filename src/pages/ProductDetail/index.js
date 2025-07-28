import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import Breadcrumb from '../../components/Breadcrumb';
import ProductDetailBanner from '../../widgets/ProductDetailBanner';
import ProductDetails from '../../widgets/ProductDetails';
import styles from './productDetail.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Product not found, redirect to shop
        navigate('/shop');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.productDetailPage}>
      <Breadcrumb productName={product.name} />
      <ProductDetailBanner product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductDetail; 