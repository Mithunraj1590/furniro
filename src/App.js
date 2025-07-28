import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { resetScrollLock } from './utils/scrollLock';
import SmoothScroll from './components/SmoothScroll';
import PageTransition from './components/PageTransition';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import styles from './styles/App.module.scss';
import HomeBanner from './widgets/HomeBanner';
import BrowseTheRange from './widgets/BrowseTheRange';
import OurProducts from './widgets/OurProducts';
import RoomInspiration from './widgets/RoomInspiration';
import ShareSetup from './widgets/ShareSetup';
import ShopBanner from './widgets/ShopBanner';
import FilterTab from './widgets/FilterTab';
import FilterPanel from './widgets/FilterPanel';
import ProductGrid from './widgets/ProductGrid';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import { getAllProducts } from './services/productService';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Home page component
const Home = () => (
  <>
    <Helmet>
      <title>Home | Ecom Store</title>
      <meta name="description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <link rel="canonical" href="/" />
      <meta property="og:title" content="Home | Ecom Store" />
      <meta property="og:description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/" />
      <meta property="og:image" content="/logo192.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home | Ecom Store" />
      <meta name="twitter:description" content="Discover the best in modern furniture, home decor, and inspiration at Ecom Store. Shop our curated collections and transform your space today!" />
      <meta name="twitter:image" content="/logo192.png" />
      <meta name="helmet-test" content="This meta tag should appear in head if Helmet is working" />
    </Helmet>
    <PageTransition>
      <div>
        <HomeBanner />
        <BrowseTheRange />
        <OurProducts />
        <RoomInspiration />
        <ShareSetup />
      </div>
    </PageTransition>
  </>
);

// Shop page component
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
    console.log('Changing view to:', view);
    setCurrentView(view);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSortChange = (sort) => {
    console.log('Changing sort to:', sort);
    setCurrentSort(sort);
  };

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
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
    <PageTransition>
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
    </PageTransition>
  );
};

function App() {
  // Cleanup scroll lock on app unmount
  useEffect(() => {
    return () => {
      resetScrollLock();
    };
  }, []);

  return (
    <HelmetProvider>
      <SmoothScroll>
        <div className={styles.App}>
          <Header />
          <ThemeToggle />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:title" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
            <Route path="/shipping-info" element={<PageTransition><ShippingInfo /></PageTransition>} />
            <Route path="/returns" element={<PageTransition><Returns /></PageTransition>} />
            <Route path="/size-guide" element={<PageTransition><SizeGuide /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
            <Route path="/support" element={<PageTransition><Support /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </SmoothScroll>
    </HelmetProvider>
  );
}

export default App;
