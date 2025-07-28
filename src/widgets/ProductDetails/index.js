import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './productDetails.module.scss';

const ProductDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent quality and comfort. The sofa looks exactly as shown in the pictures. Highly recommended!'
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great sofa, very comfortable. The delivery was on time and the assembly was straightforward.'
    },
    {
      id: 3,
      user: 'Mike R.',
      rating: 5,
      date: '2024-01-08',
      comment: 'Perfect addition to our living room. The quality is outstanding and it fits our space perfectly.'
    },
    {
      id: 4,
      user: 'Lisa K.',
      rating: 4,
      date: '2024-01-05',
      comment: 'Beautiful design and very comfortable. The fabric is soft and the construction is solid.'
    },
    {
      id: 5,
      user: 'David P.',
      rating: 5,
      date: '2024-01-02',
      comment: 'Amazing sofa! The comfort level is incredible and it looks even better in person than online.'
    }
  ]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      const review = {
        id: reviews.length + 1,
        user: 'You',
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        comment: newReview.comment.trim()
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: '' });
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i 
        key={i} 
        className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}
      ></i>
    ));
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className={styles.productDetails}>
      <div className="container">
        {/* Tab Navigation */}
        <div className={styles.tabNavigation}>
          <button
            className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => handleTabChange('description')}
          >
            Description
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'additional' ? styles.active : ''}`}
            onClick={() => handleTabChange('additional')}
          >
            Additional Information
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => handleTabChange('reviews')}
          >
            Reviews [{reviews.length}]
          </button>
        </div>

        {/* Tab Content */}
        <motion.div 
          className={styles.tabContent}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className={styles.descriptionContent}>
              <div className={styles.descriptionText}>
                <p>
                  {product?.description || 'No description available for this product.'}
                </p>
              </div>
              
              <div className={styles.productImages}>
                <div className={styles.imageContainer}>
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop" 
                    alt="Product configuration 1" 
                  />
                </div>
                <div className={styles.imageContainer}>
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop" 
                    alt="Product configuration 2" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Information Tab */}
          {activeTab === 'additional' && (
            <div className={styles.additionalInfo}>
              <div className={styles.infoTable}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Weight:</span>
                  <span className={styles.infoValue}>{product?.weight || '45kg'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Dimensions:</span>
                  <span className={styles.infoValue}>{product?.dimensions || '200cm x 85cm x 75cm'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Material:</span>
                  <span className={styles.infoValue}>{product?.material || 'Wood'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Color:</span>
                  <span className={styles.infoValue}>{product?.color || 'Brown'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Category:</span>
                  <span className={styles.infoValue}>{product?.category || 'Living Room'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>SKU:</span>
                  <span className={styles.infoValue}>{product?.sku || 'SS001'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className={styles.reviewsContent}>
              {/* Review Form */}
              <div className={styles.reviewForm}>
                <h3>Write a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className={styles.ratingInput}>
                    <label>Rating:</label>
                    <div className={styles.starRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={styles.starButton}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                        >
                          <i className={`bi ${star <= newReview.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.commentInput}>
                    <label htmlFor="reviewComment">Comment:</label>
                    <textarea
                      id="reviewComment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your thoughts about this product..."
                      rows="4"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className={styles.reviewsList}>
                <h3>Customer Reviews</h3>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewInfo}>
                        <span className={styles.reviewerName}>{review.user}</span>
                        <div className={styles.reviewStars}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className={styles.reviewDate}>{review.date}</span>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetails; 