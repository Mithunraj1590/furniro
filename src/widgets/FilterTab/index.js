import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import styles from './filterTab.module.scss';

const FilterTab = ({ 
    totalResults = 32, 
    currentPage = 1, 
    itemsPerPage = 16,
    onFilterClick,
    onViewChange,
    onItemsPerPageChange,
    onSortChange,
    currentView = 'grid',
    currentSort = 'Default'
}) => {
    const [showItemsPerPage, setShowItemsPerPage] = useState(false);
    const [showSortBy, setShowSortBy] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    
    const itemsPerPageRef = useRef(null);
    const sortByRef = useRef(null);

    const startResult = (currentPage - 1) * itemsPerPage + 1;
    const endResult = Math.min(currentPage * itemsPerPage, totalResults);

    const itemsPerPageOptions = [8, 16, 24, 32];
    const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Name: A to Z', 'Name: Z to A', 'Newest First'];

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (itemsPerPageRef.current && !itemsPerPageRef.current.contains(event.target)) {
                setShowItemsPerPage(false);
            }
            if (sortByRef.current && !sortByRef.current.contains(event.target)) {
                setShowSortBy(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle scroll locking when mobile modal is open
    useEffect(() => {
        if (showMobileModal) {
            lockScroll();
        } else {
            unlockScroll();
        }

        // Cleanup on unmount
        return () => {
            if (showMobileModal) {
                unlockScroll();
            }
        };
    }, [showMobileModal]);

    const containerVariants = {
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

    const modalVariants = {
        hidden: { y: '100%' },
        visible: { 
            y: 0,
            transition: { 
                type: 'spring', 
                damping: 25, 
                stiffness: 300 
            }
        },
        exit: { 
            y: '100%',
            transition: { 
                type: 'spring', 
                damping: 25, 
                stiffness: 300 
            }
        }
    };

    const handleMobileModalClose = () => {
        setShowMobileModal(false);
        setShowItemsPerPage(false);
        setShowSortBy(false);
    };

    return (
        <motion.section 
            className={styles.filterTab}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <div className="container">
          <div className={styles.filterContainer}>
              

                <div className={styles.filterSection}>
                    {/* Filter Button */}
                    <button 
                        className={styles.filterButton}
                        onClick={onFilterClick}
                    >
                        <i className="bi bi-funnel"></i>
                        <span>Filter</span>
                    </button>

                    <div className={styles.divider}></div>

                    {/* View Toggles */}
                    <div className={styles.viewToggles}>
                        <button 
                            className={`${styles.viewToggle} ${currentView === 'grid' ? styles.active : ''}`}
                            onClick={() => onViewChange('grid')}
                            aria-label="Grid view"
                        >
                            <i className="bi bi-grid-3x3-gap"></i>
                        </button>
                        <button 
                            className={`${styles.viewToggle} ${currentView === 'list' ? styles.active : ''}`}
                            onClick={() => onViewChange('list')}
                            aria-label="List view"
                        >
                            <i className="bi bi-list-ul"></i>
                        </button>
                    </div>
                      {/* Desktop Results Count - Left Side */}
                <div className={styles.desktopResultsCount}>
                    Showing {startResult}-{endResult} of {totalResults} results
                </div>

                    {/* Mobile Sort/Show Button */}
                    <button 
                        className={styles.mobileSortButton}
                        onClick={() => setShowMobileModal(true)}
                    >
                        <i className="bi bi-sliders"></i>
                        <span>Sort & Show</span>
                    </button>
                </div>

                {/* Desktop Controls Section */}
                <div className={styles.controlsSection}>
                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>Show:</span>
                        <div className={styles.dropdownContainer} ref={itemsPerPageRef}>
                            <button 
                                className={styles.dropdownButton}
                                onClick={() => setShowItemsPerPage(!showItemsPerPage)}
                            >
                                <span>{itemsPerPage}</span>
                                <i className={`bi ${showItemsPerPage ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                            </button>
                            {showItemsPerPage && (
                                <div className={styles.dropdownMenu}>
                                    {itemsPerPageOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={`${styles.dropdownItem} ${itemsPerPage === option ? styles.active : ''}`}
                                            onClick={() => {
                                                onItemsPerPageChange(option);
                                                setShowItemsPerPage(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <span className={styles.controlLabel}>Sort by:</span>
                        <div className={styles.dropdownContainer} ref={sortByRef}>
                            <button 
                                className={styles.dropdownButton}
                                onClick={() => setShowSortBy(!showSortBy)}
                            >
                                <span>{currentSort}</span>
                                <i className={`bi ${showSortBy ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                            </button>
                            {showSortBy && (
                                <div className={styles.dropdownMenu}>
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={`${styles.dropdownItem} ${currentSort === option ? styles.active : ''}`}
                                            onClick={() => {
                                                onSortChange(option);
                                                setShowSortBy(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Results Count */}
                <div className={styles.mobileResultsCount}>
                    Showing {startResult}-{endResult} of {totalResults} results
                </div>
            </div>

            {/* Mobile Modal */}
            <AnimatePresence>
                {showMobileModal && (
                    <>
                        <motion.div 
                            className={styles.modalOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleMobileModalClose}
                        />
                        <motion.div 
                            className={styles.mobileModal}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className={styles.modalHeader}>
                                <h3>Sort & Show</h3>
                                <button 
                                    className={styles.closeButton}
                                    onClick={handleMobileModalClose}
                                >
                                    <i className="bi bi-x"></i>
                                </button>
                            </div>

                            <div className={styles.modalContent}>
                                {/* Show Options */}
                                <div className={styles.modalSection}>
                                    <h4>Show</h4>
                                    <div className={styles.modalOptions}>
                                        {itemsPerPageOptions.map((option) => (
                                            <button
                                                key={option}
                                                className={`${styles.modalOption} ${itemsPerPage === option ? styles.active : ''}`}
                                                onClick={() => {
                                                    onItemsPerPageChange(option);
                                                    setShowMobileModal(false);
                                                }}
                                            >
                                                {option} items
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort Options */}
                                <div className={styles.modalSection}>
                                    <h4>Sort by</h4>
                                    <div className={styles.modalOptions}>
                                        {sortOptions.map((option) => (
                                            <button
                                                key={option}
                                                className={`${styles.modalOption} ${currentSort === option ? styles.active : ''}`}
                                                onClick={() => {
                                                    onSortChange(option);
                                                    setShowMobileModal(false);
                                                }}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
          </div>
        </motion.section>
    );
};

export default FilterTab; 