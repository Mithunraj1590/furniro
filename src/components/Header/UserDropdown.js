import React from 'react';
import styles from './header.module.scss';

const UserDropdown = ({ isOpen, user, onSignOut, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.dropdownMenu} ${styles.active}`}>
      <div className={styles.userInfo}>
        <img src={user.avatar} alt={user.name} className={styles.userAvatar} />
        <div className={styles.userDetails}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userEmail}>{user.email}</span>
        </div>
      </div>
      <div className={styles.dropdownActions}>
        <button className="btn btn-outline-primary btn-sm w-100 mb-2">
          <i className="bi bi-person me-2"></i>
          Profile
        </button>
        <button 
          className="btn btn-outline-danger btn-sm w-100"
          onClick={onSignOut}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserDropdown; 