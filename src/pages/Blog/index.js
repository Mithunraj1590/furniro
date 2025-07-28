import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShopBanner from '../../widgets/ShopBanner';
import BlogCard from '../../components/BlogCard';
import RecentPostCard from '../../components/RecentPostCard';
import styles from './blog.module.scss';
import { Helmet } from 'react-helmet-async';

const blogPosts = [
  {
    id: 1,
    image: '/blog1.png',
    title: 'Going all-in with millennial design',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc.',
    author: 'Admin',
    date: '14 Oct 2022',
    category: 'Wood',
    link: '/blog/going-all-in-with-millennial-design',
    readTime: '5 min read',
    content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
  },
  {
    id: 2,
    image: '/blog2.png',
    title: 'Exploring new ways of decorating',
    excerpt: 'Discover innovative approaches to home decor and how to bring fresh energy into your living spaces.',
    author: 'Admin',
    date: '18 Oct 2022',
    category: 'Handmade',
    link: '/blog/exploring-new-ways-of-decorating',
    readTime: '4 min read',
  },
  {
    id: 3,
    image: '/blog3.png',
    title: 'Handmade pieces that took time to make',
    excerpt: 'A look at the craftsmanship and dedication behind unique handmade furniture and decor.',
    author: 'Admin',
    date: '22 Oct 2022',
    category: 'Wood',
    link: '/blog/handmade-pieces-that-took-time-to-make',
    readTime: '6 min read',
  },
  {
    id: 4,
    image: '/blog2.png',
    title: 'Modern home in Milan',
    excerpt: 'Step inside a modern Milanese home and see how design trends are evolving in Italy.',
    author: 'Admin',
    date: '25 Oct 2022',
    category: 'Design',
    link: '/blog/modern-home-in-milan',
    readTime: '3 min read',
  },
  {
    id: 5,
    image: '/blog1.png',
    title: 'Colorful office redesign',
    excerpt: 'How to use color to boost creativity and productivity in your workspace.',
    author: 'Admin',
    date: '28 Oct 2022',
    category: 'Interior',
    link: '/blog/colorful-office-redesign',
    readTime: '4 min read',
  },
  {
    id: 6,
    image: '/blog3.png',
    title: 'Sustainable materials in furniture',
    excerpt: 'Why sustainability matters and how to choose eco-friendly furniture for your home.',
    author: 'Admin',
    date: '01 Nov 2022',
    category: 'Crafts',
    link: '/blog/sustainable-materials-in-furniture',
    readTime: '5 min read',
  },
  {
    id: 7,
    image: '/blog2.png',
    title: 'Minimalist living: less is more',
    excerpt: 'Embrace minimalism and learn how to create a clutter-free, peaceful home.',
    author: 'Admin',
    date: '05 Nov 2022',
    category: 'Design',
    link: '/blog/minimalist-living-less-is-more',
    readTime: '3 min read',
  },
  {
    id: 8,
    image: '/blog1.png',
    title: 'The art of upcycling',
    excerpt: 'Transform old items into beautiful new pieces with upcycling tips and tricks.',
    author: 'Admin',
    date: '10 Nov 2022',
    category: 'Crafts',
    link: '/blog/the-art-of-upcycling',
    readTime: '4 min read',
  },
  {
    id: 9,
    image: '/blog3.png',
    title: 'Decorating with plants',
    excerpt: 'Bring life to your home with indoor plants and creative plant displays.',
    author: 'Admin',
    date: '15 Nov 2022',
    category: 'Handmade',
    link: '/blog/decorating-with-plants',
    readTime: '3 min read',
  },
  {
    id: 10,
    image: '/blog2.png',
    title: 'Choosing the right lighting',
    excerpt: 'Lighting can make or break a room. Learn how to choose the best lighting for every space.',
    author: 'Admin',
    date: '20 Nov 2022',
    category: 'Interior',
    link: '/blog/choosing-the-right-lighting',
    readTime: '4 min read',
  },
];

const recentPosts = blogPosts.slice(0, 5);

const categories = [
  { name: 'Crafts', count: 2 },
  { name: 'Design', count: 8 },
  { name: 'Handmade', count: 7 },
  { name: 'Interior', count: 2 },
  { name: 'Wood', count: 2 }
];

const POSTS_PER_PAGE = 2;

// Helper to create a slug from a title
const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const navigate = useNavigate();

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const blogBannerData = {
    title: "Blog",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" }
    ],
    currentPage: "Blog"
  };

  // Search and filter logic
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory) {
      posts = posts.filter(post => post.category.toLowerCase() === activeCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }
    return posts;
  }, [searchQuery, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the input onChange
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActiveCategory('');
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleBlogClick = (title) => {
    navigate(`/blog/${toSlug(title)}`);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleClearCategory = () => {
    setActiveCategory('');
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Blog | Ecom Store</title>
        <meta name="description" content="Read the latest articles, tips, and inspiration on design, crafts, and home decor from Ecom Store." />
        <link rel="canonical" href="/blog" />
      </Helmet>
      <motion.div 
        className={styles.blogPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...blogBannerData} />
        <section className={styles.blogMainSection}>
          <div className="container">
            <div className={styles.blogLayout}>
              <main className={styles.blogList}>
                {activeCategory && (
                  <div className={styles.activeCategoryBanner}>
                    <span>Showing posts in category: <b>{activeCategory}</b></span>
                    <button onClick={handleClearCategory} className={styles.clearCategoryBtn} aria-label="Clear category filter">&times;</button>
                  </div>
                )}
                {paginatedPosts.length > 0 ? (
                  <>
                    {paginatedPosts.map(post => (
                      <div key={post.id} onClick={() => handleBlogClick(post.title)} style={{ cursor: 'pointer' }}>
                        <BlogCard {...post} link={`/blog/${toSlug(post.title)}`} />
                      </div>
                    ))}
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <nav className={styles.pagination} aria-label="Blog pagination">
                        <ul>
                          <li>
                            <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              aria-label="Previous page"
                            >
                              Prev
                            </button>
                          </li>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className={currentPage === i + 1 ? styles.active : ''}>
                              <button
                                onClick={() => handlePageChange(i + 1)}
                                aria-current={currentPage === i + 1 ? 'page' : undefined}
                                aria-label={`Go to page ${i + 1}`}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              aria-label="Next page"
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </>
                ) : (
                  <div className={styles.noResults}>
                    <h3>No posts found</h3>
                    <p>Try adjusting your search terms or browse our categories.</p>
                  </div>
                )}
              </main>
              <aside className={styles.sidebar} aria-label="Blog sidebar">
                <form className={styles.searchForm} onSubmit={handleSearch} role="search" aria-label="Search blog posts">
                  <input 
                    type="search" 
                    placeholder="Search posts..." 
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" aria-label="Search">
                    <i className="bi bi-search"></i>
                  </button>
                </form>
                <div className={styles.categories}>
                  <h3>Categories</h3>
                  <ul>
                    {categories.map(cat => (
                      <li key={cat.name}>
                        <button
                          type="button"
                          className={activeCategory === cat.name ? styles.activeCategory : ''}
                          onClick={() => handleCategoryClick(cat.name)}
                          aria-pressed={activeCategory === cat.name}
                        >
                          <span>{cat.name}</span>
                          <span className={styles.count}>{cat.count}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.recentPosts}>
                  <h3>Recent Posts</h3>
                  {recentPosts.map(post => (
                    <RecentPostCard key={post.id} {...post} link={`/blog/${toSlug(post.title)}`} />
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Blog; 