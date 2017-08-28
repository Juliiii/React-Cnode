import React from 'react';
import styles from './avatar.css';
export default ({src = 'https://avatars3.githubusercontent.com/u/8694508?v=4&s=72', size = 'md'}) => {
  switch (size) {
    case 'sm': return (<img src={src} alt="avatar" className={styles.sm} />);
    case 'la': return (<img src={src} alt="avatar" className={styles.la} />);
    default: return (<img src={src} alt="avatar" className={styles.md} />);
  }
};


