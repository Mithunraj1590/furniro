import React from 'react';
import { Link } from 'react-router-dom';
import styles from './recentPostCard.module.scss';

const RecentPostCard = ({ image, title, date, link }) => (
  <div className={styles.recentPostCard}>
    <Link to={link} className={styles.imageLink} tabIndex={-1}>
      <img src={image} alt={title} className={styles.image} loading="lazy" />
    </Link>
    <div className={styles.info}>
      <Link to={link} className={styles.title}>{title}</Link>
      <span className={styles.date}>{date}</span>
    </div>
  </div>
);

export default RecentPostCard; 