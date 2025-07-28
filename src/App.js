import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { resetScrollLock } from './utils/scrollLock';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import styles from './styles/App.module.scss';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import ProductDetail from './pages/ProductDetail';
import ShippingInfo from './pages/ShippingInfo';
import Returns from './pages/Returns';
import SizeGuide from './pages/SizeGuide';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Home from './pages/Home';
import Shop from './pages/Shop';

function App() {
  // Cleanup scroll lock on app unmount
  useEffect(() => {
    return () => {
      resetScrollLock();
    };
  }, []);

  return (

      <SmoothScroll>
        <div className={styles.App}>
          <Header />
          <ThemeToggle />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:title" element={<BlogDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </SmoothScroll>
  
  );
}

export default App;
