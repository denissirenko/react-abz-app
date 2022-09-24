import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Logo from '../../assets/Logo.svg';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles['header-wrap']}>
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className={styles['navigations-btn']}>
            <AnchorLink className="btn" href="#users">
              Users
            </AnchorLink>
            <AnchorLink className="btn" href="#signUp">
              Sign up
            </AnchorLink>
          </div>
        </div>
      </div>
    </header>
  );
};
