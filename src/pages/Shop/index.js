import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getAllProducts } from '../../services/productService';
import ShopBanner from '../../widgets/ShopBanner';
import FilterTab from '../../widgets/FilterTab';
import FilterPanel from '../../widgets/FilterPanel';
import ProductGrid from '../../widgets/ProductGrid';

const Shop = () => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [currentView, setCurrentView] = useState('grid');
  const [currentSort, setCurrentSort] = useState('Default');
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  // Get all products from the common service
  const allProducts = getAllProducts();

  // Calculate filtered results count
  const filteredResultsCount = React.useMemo(() => {
    if (!currentFilters || Object.keys(currentFilters).length === 0) {
      return allProducts.length;
    }

    return allProducts.filter(product => {
      // Category filter
      if (currentFilters.categories && currentFilters.categories.length > 0) {
        if (!currentFilters.categories.includes(product.category)) {
          return false;
        }
      }
      // Color filter
      if (currentFilters.colors && currentFilters.colors.length > 0) {
        if (!currentFilters.colors.includes(product.color)) {
          return false;
        }
      }
      // Material filter
      if (currentFilters.materials && currentFilters.materials.length > 0) {
        if (!currentFilters.materials.includes(product.material)) {
          return false;
        }
      }
      // Price range filter
      if (currentFilters.priceRange && (currentFilters.priceRange.min !== null || currentFilters.priceRange.max !== null)) {
        const price = typeof product.price === 'string'
          ? parseFloat(product.price.replace('Rs. ', '').replace(',', ''))
          : product.price;
        const min = currentFilters.priceRange.min;
        const max = currentFilters.priceRange.max;

        if (min !== null && price < min) {
          return false;
        }
        if (max !== null && price > max) {
          return false;
        }
      }
      return true;
    }).length;
  }, [currentFilters, allProducts]);

  const handleFilterClick = () => {
    setIsFilterPanelOpen(true);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSortChange = (sort) => {
    setCurrentSort(sort);
  };

  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleCloseFilterPanel = () => {
    setIsFilterPanelOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Shop | Ecom Store</title>
        <meta name="description" content="Browse and shop the best products at Ecom Store. Find your favorites and enjoy exclusive deals!" />
        <link rel="canonical" href="/shop" />
      </Helmet>
      <div>
        <ShopBanner />
        <FilterTab
          totalResults={filteredResultsCount}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onFilterClick={handleFilterClick}
          onViewChange={handleViewChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          onSortChange={handleSortChange}
          currentView={currentView}
          currentSort={currentSort}
        />
        <ProductGrid
          products={allProducts}
          filters={currentFilters}
          viewMode={currentView}
          currentSort={currentSort}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={handleCloseFilterPanel}
          onApplyFilters={handleApplyFilters}
          filters={currentFilters}
        />
      </div>
    </>
  );
};

export default Shop; 