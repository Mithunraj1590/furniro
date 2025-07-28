import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShopBanner from '../../widgets/ShopBanner';
import styles from './blogDetail.module.scss';
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
    readTime: '4 min read',
    content: `<p>Discover innovative approaches to home decor and how to bring fresh energy into your living spaces. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 3,
    image: '/blog3.png',
    title: 'Handmade pieces that took time to make',
    excerpt: 'A look at the craftsmanship and dedication behind unique handmade furniture and decor.',
    author: 'Admin',
    date: '22 Oct 2022',
    category: 'Wood',
    readTime: '6 min read',
    content: `<p>A look at the craftsmanship and dedication behind unique handmade furniture and decor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 4,
    image: '/blog2.png',
    title: 'Modern home in Milan',
    excerpt: 'Step inside a modern Milanese home and see how design trends are evolving in Italy.',
    author: 'Admin',
    date: '25 Oct 2022',
    category: 'Design',
    readTime: '3 min read',
    content: `<p>Step inside a modern Milanese home and see how design trends are evolving in Italy. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 5,
    image: '/blog1.png',
    title: 'Colorful office redesign',
    excerpt: 'How to use color to boost creativity and productivity in your workspace.',
    author: 'Admin',
    date: '28 Oct 2022',
    category: 'Interior',
    readTime: '4 min read',
    content: `<p>How to use color to boost creativity and productivity in your workspace. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 6,
    image: '/blog3.png',
    title: 'Sustainable materials in furniture',
    excerpt: 'Why sustainability matters and how to choose eco-friendly furniture for your home.',
    author: 'Admin',
    date: '01 Nov 2022',
    category: 'Crafts',
    readTime: '5 min read',
    content: `<p>Why sustainability matters and how to choose eco-friendly furniture for your home. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 7,
    image: '/blog2.png',
    title: 'Minimalist living: less is more',
    excerpt: 'Embrace minimalism and learn how to create a clutter-free, peaceful home.',
    author: 'Admin',
    date: '05 Nov 2022',
    category: 'Design',
    readTime: '3 min read',
    content: `<p>Embrace minimalism and learn how to create a clutter-free, peaceful home. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 8,
    image: '/blog1.png',
    title: 'The art of upcycling',
    excerpt: 'Transform old items into beautiful new pieces with upcycling tips and tricks.',
    author: 'Admin',
    date: '10 Nov 2022',
    category: 'Crafts',
    readTime: '4 min read',
    content: `<p>Transform old items into beautiful new pieces with upcycling tips and tricks. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 9,
    image: '/blog3.png',
    title: 'Decorating with plants',
    excerpt: 'Bring life to your home with indoor plants and creative plant displays.',
    author: 'Admin',
    date: '15 Nov 2022',
    category: 'Handmade',
    readTime: '3 min read',
    content: `<p>Bring life to your home with indoor plants and creative plant displays. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
  {
    id: 10,
    image: '/blog2.png',
    title: 'Choosing the right lighting',
    excerpt: 'Lighting can make or break a room. Learn how to choose the best lighting for every space.',
    author: 'Admin',
    date: '20 Nov 2022',
    category: 'Interior',
    readTime: '4 min read',
    content: `<p>Lighting can make or break a room. Learn how to choose the best lighting for every space. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`
  },
];

// Helper to create a slug from a title
const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const BlogDetail = () => {
  const { title } = useParams();
  const slug = title;

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Find the blog post by slug
  const blogPost = blogPosts.find(post => toSlug(post.title) === slug);

  const blogBannerData = {
    title: blogPost?.title || "Blog Post",
    backgroundImage: "/banner.png",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" }
    ],
    currentPage: blogPost?.title || "Blog Post"
  };

  if (!blogPost) {
    return (
      <>
        <Helmet>
          <title>Blog Post Not Found | Ecom Store</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <motion.div 
          className={styles.blogDetailPage}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          <ShopBanner {...blogBannerData} />
          <section className={styles.blogMainSection}>
            <div className="container">
              <div className={styles.notFound}>
                <h2>Blog Post Not Found</h2>
                <p>The blog post you're looking for doesn't exist.</p>
                <Link to="/blog" className="btn btn-primary">
                  Back to Blog
                </Link>
              </div>
            </div>
          </section>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blogPost.title} | Ecom Store</title>
        <meta name="description" content={blogPost.excerpt} />
        <link rel="canonical" href={`/blog/${toSlug(blogPost.title)}`} />
      </Helmet>
      <motion.div 
        className={styles.blogDetailPage}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <ShopBanner {...blogBannerData} />
        <section className={styles.blogMainSection}>
          <div className="container">
            <div className={styles.blogContent}>
              <article className={styles.blogPost}>
                <div className={styles.postImage}>
                  <img src={blogPost.image} alt={blogPost.title} />
                </div>
                
                <div className={styles.postMeta}>
                  <div className={styles.metaItem}>
                    <i className="bi bi-person"></i>
                    <span>{blogPost.author}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <i className="bi bi-calendar"></i>
                    <span>{blogPost.date}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <i className="bi bi-tag"></i>
                    <span>{blogPost.category}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <i className="bi bi-clock"></i>
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>
                
                <h1 className={styles.postTitle}>{blogPost.title}</h1>
                
                <div 
                  className={styles.postContent}
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
                
                <div className={styles.postActions}>
                  <Link to="/blog" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left"></i>
                    Back to Blog
                  </Link>
                  <div className={styles.socialShare}>
                    <span>Share:</span>
                    <button className={styles.shareBtn} aria-label="Share on Facebook">
                      <i className="bi bi-facebook"></i>
                    </button>
                    <button className={styles.shareBtn} aria-label="Share on Twitter">
                      <i className="bi bi-twitter"></i>
                    </button>
                    <button className={styles.shareBtn} aria-label="Share on LinkedIn">
                      <i className="bi bi-linkedin"></i>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default BlogDetail; 