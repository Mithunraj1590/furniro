import React, { useState, useEffect, useRef } from 'react';
import styles from './searchBar.module.scss';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Modern Chair',
    'Wooden Table',
    'Sofa Set',
    'Dining Table'
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const searchInputRef = useRef(null);

  // Mock suggestions based on search query
  const getSuggestions = (query) => {
    if (!query.trim()) return [];
    
    const allProducts = [
      'Modern Chair', 'Wooden Table', 'Sofa Set', 'Dining Table',
      'Coffee Table', 'Bed Frame', 'Wardrobe', 'Bookshelf',
      'Office Chair', 'Kitchen Cabinet', 'TV Stand', 'Side Table'
    ];
    
    return allProducts.filter(product => 
      product.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  };

  // Popular categories with icons
  const popularCategories = [
    { name: 'Furniture', icon: 'bi-house-door' },
    { name: 'Lighting', icon: 'bi-lightbulb' },
    { name: 'Decor', icon: 'bi-palette' },
    { name: 'Kitchen', icon: 'bi-cup-hot' },
    { name: 'Bathroom', icon: 'bi-droplet' },
    { name: 'Outdoor', icon: 'bi-tree' }
  ];

  useEffect(() => {
    if (isOpen) {
      // Focus input when search opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
      
      // Update suggestions
      setSuggestions(getSuggestions(searchQuery));
    } else {
      // Clear search when closing
      setSearchQuery('');
      setSuggestions([]);
    }
  }, [isOpen, searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Add to recent searches
      if (!recentSearches.includes(query)) {
        setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
      }
      
      // Perform search (replace with actual search logic)
      console.log('Searching for:', query);
      
      // Close search bar
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleRecentSearchClick = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchOverlay}>
      <div className={styles.searchContainer}>
        <div className="container">
          <div className={styles.searchContent}>
            {/* Search Input */}
            <form onSubmit={handleSubmit} className={styles.searchForm}>
              <div className={styles.searchInputWrapper}>
                <i className={`bi bi-search ${styles.searchIcon}`}></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search for products, categories, or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  type="submit" 
                  className={styles.searchButton}
                  disabled={!searchQuery.trim()}
                >
                  <i className="bi bi-search"></i>
                  Search
                </button>
              </div>
              <button 
                type="button" 
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close search"
              >
                <i className="bi bi-x"></i>
              </button>
            </form>

            {/* Search Results/Suggestions */}
            <div className={styles.searchResults}>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className={styles.recentSearches}>
                  <div className={styles.sectionHeader}>
                    <h6>Recent Searches</h6>
                    <button 
                      type="button" 
                      className={styles.clearButton}
                      onClick={clearRecentSearches}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className={styles.searchTags}>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        type="button"
                        className={styles.searchTag}
                        onClick={() => handleRecentSearchClick(search)}
                      >
                        <i className="bi bi-clock-history"></i>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  <h6>Suggestions</h6>
                  <div className={styles.suggestionList}>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className={styles.suggestionItem}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <i className="bi bi-search"></i>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div className={styles.popularCategories}>
                <h6>Popular Categories</h6>
                <div className={styles.categoryGrid}>
                  {popularCategories.map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      className={styles.categoryItem}
                      onClick={() => handleSuggestionClick(category.name)}
                    >
                      <span>
                        <i className={`bi ${category.icon} me-2`}></i>
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 