import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, variant = 'primary', className = '', loading = false, ...rest }) => {
  const cls = `${styles.btn} ${variant === 'ghost' ? styles.ghost : styles.primary} ${className}`;
  return (
    <button className={cls} disabled={loading} {...rest}>
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};

export default Button;
