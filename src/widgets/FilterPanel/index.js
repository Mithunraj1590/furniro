import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import styles from './filterPanel.module.scss';

const FilterPanel = ({ 
    isOpen, 
    onClose, 
    onApplyFilters,
    filters = {}
}) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Sync localFilters with filters prop when panel opens
    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
        }
    }, [filters, isOpen]);

    // Handle scroll locking when filter panel is open
    useEffect(() => {
        if (isOpen) {
            lockScroll();
        } else {
            unlockScroll();
        }

        // Cleanup on unmount
        return () => {
            if (isOpen) {
                unlockScroll();
            }
        };
    }, [isOpen]);

    const categories = [
        'Living Room', 'Bedroom', 'Dining Room', 'Kitchen', 
        'Office', 'Outdoor', 'Bathroom', 'Kids Room'
    ];

    const colors = [
        'White', 'Black', 'Brown', 'Gray', 'Beige', 
        'Blue', 'Green', 'Red', 'Yellow', 'Pink'
    ];

    const materials = [
        'Wood', 'Metal', 'Fabric', 'Leather', 'Plastic', 
        'Glass', 'Ceramic', 'Stone', 'Bamboo', 'Rattan'
    ];

    const priceRanges = [
        { label: 'Under $100', min: 0, max: 100 },
        { label: '$100 - $300', min: 100, max: 300 },
        { label: '$300 - $500', min: 300, max: 500 },
        { label: '$500 - $1000', min: 500, max: 1000 },
        { label: 'Over $1000', min: 1000, max: null }
    ];

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...localFilters };
        
        if (filterType === 'priceRange') {
            newFilters.priceRange = value;
        } else if (filterType === 'categories') {
            if (!newFilters.categories) newFilters.categories = [];
            const index = newFilters.categories.indexOf(value);
            if (index > -1) {
                newFilters.categories.splice(index, 1);
            } else {
                newFilters.categories.push(value);
            }
        } else if (filterType === 'colors') {
            if (!newFilters.colors) newFilters.colors = [];
            const index = newFilters.colors.indexOf(value);
            if (index > -1) {
                newFilters.colors.splice(index, 1);
            } else {
                newFilters.colors.push(value);
            }
        } else if (filterType === 'materials') {
            if (!newFilters.materials) newFilters.materials = [];
            const index = newFilters.materials.indexOf(value);
            if (index > -1) {
                newFilters.materials.splice(index, 1);
            } else {
                newFilters.materials.push(value);
            }
        }

        setLocalFilters(newFilters);
        // Only update local state, don't apply filters yet
    };

    const handleApplyFilters = () => {
        onApplyFilters(localFilters);
        onClose();
    };

    const handleClearFilters = () => {
        const clearedFilters = {};
        setLocalFilters(clearedFilters);
        // Immediately apply the cleared filters
        onApplyFilters(clearedFilters);
    };

    const panelVariants = {
        hidden: { 
            opacity: 0, 
            x: -300,
            transition: { duration: 0.3 }
        },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    // Simple test render to see if component is working
    if (!isOpen) {
        return null;
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className={styles.overlay}
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose}
                    />
                    <motion.div
                        className={styles.filterPanel}
                        variants={panelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className={styles.header}>
                            <h3>Filters</h3>
                            <button 
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close filters"
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <div className={styles.content}>
                            {/* Categories */}
                            <div className={styles.filterSection}>
                                <h4>Categories</h4>
                                <div className={styles.checkboxGroup}>
                                    {categories.map((category) => (
                                        <label key={category} className={styles.checkboxItem}>
                                            <input
                                                type="checkbox"
                                                checked={localFilters.categories?.includes(category) || false}
                                                onChange={() => handleFilterChange('categories', category)}
                                            />
                                            <span className={styles.checkmark}></span>
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className={styles.filterSection}>
                                <h4>Price Range</h4>
                                <div className={styles.radioGroup}>
                                    {priceRanges.map((range) => (
                                        <label key={range.label} className={styles.radioItem}>
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                checked={localFilters.priceRange?.label === range.label}
                                                onChange={() => handleFilterChange('priceRange', range)}
                                            />
                                            <span className={styles.radioMark}></span>
                                            {range.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div className={styles.filterSection}>
                                <h4>Colors</h4>
                                <div className={styles.checkboxGroup}>
                                    {colors.map((color) => (
                                        <label key={color} className={styles.checkboxItem}>
                                            <input
                                                type="checkbox"
                                                checked={localFilters.colors?.includes(color) || false}
                                                onChange={() => handleFilterChange('colors', color)}
                                            />
                                            <span className={styles.checkmark}></span>
                                            {color}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Materials */}
                            <div className={styles.filterSection}>
                                <h4>Materials</h4>
                                <div className={styles.checkboxGroup}>
                                    {materials.map((material) => (
                                        <label key={material} className={styles.checkboxItem}>
                                            <input
                                                type="checkbox"
                                                checked={localFilters.materials?.includes(material) || false}
                                                onChange={() => handleFilterChange('materials', material)}
                                            />
                                            <span className={styles.checkmark}></span>
                                            {material}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <button 
                                className={styles.clearButton}
                                onClick={handleClearFilters}
                            >
                                Clear All
                            </button>
                            <button 
                                className={styles.applyButton}
                                onClick={handleApplyFilters}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FilterPanel; 