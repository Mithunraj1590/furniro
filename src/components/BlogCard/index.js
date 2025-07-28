import React from 'react';
import { Link } from 'react-router-dom';
import styles from './blogCard.module.scss';

const BlogCard = ({ image, title, excerpt, author, date, category, link }) => (
  <article className={styles.blogCard} itemScope itemType="http://schema.org/Article">
    <Link to={link} className={styles.imageLink} tabIndex={-1}>
      <img src={image} alt={title} className={styles.image} itemProp="image" loading="lazy" />
    </Link>
    <header className={styles.meta}>
      <span className={styles.author} itemProp="author"> <i className="bi bi-person"></i> {author}</span>
      <span className={styles.date} itemProp="datePublished"> <i className="bi bi-calendar"></i> {date}</span>
      <span className={styles.category}> <i className="bi bi-tag"></i> {category}</span>
    </header>
    <h2 className={styles.title} itemProp="headline">
      <Link to={link}>{title}</Link>
    </h2>
    <p className={styles.excerpt} itemProp="description">{excerpt}</p>
    <Link to={link} className={styles.readMore} aria-label={`Read more about ${title}`}>Read more</Link>
  </article>
);

export default BlogCard; 