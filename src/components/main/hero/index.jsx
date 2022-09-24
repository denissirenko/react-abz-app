import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { isWebpSupported } from 'react-image-webp/dist/utils';

import bg from '../../../assets/pexels-alexandr-podvalny-1227513.jpeg';
import bgWebp from '../../../assets/pexels-alexandr-podvalny-1227513.webp';
import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles['hero-container']}`}>
        <div
          className={styles['hero-inner']}
          style={{ backgroundImage: `url(${isWebpSupported() ? bgWebp : bg})` }}>
          <div className={styles['hero-content']}>
            <h1>Test assignment for front-end developer</h1>
            <p className={styles['hero-text']}>
              What defines a good front-end developer is one that has skilled knowledge of HTML,
              CSS, JS with a vast understanding of User design thinking as they'll be building web
              interfaces with accessibility in mind. They should also be excited to learn, as the
              world of Front-End Development keeps evolving.
            </p>
            <AnchorLink className="btn" href="#signUp">
              Sign up
            </AnchorLink>
          </div>
        </div>
      </div>
    </section>
  );
};
