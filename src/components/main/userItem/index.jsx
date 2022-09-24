import React from 'react';
import ReactTooltip from 'react-tooltip';
import parsePhoneNumber from 'libphonenumber-js';

import photoDefault from '../../../assets/photo-cover.svg';

import styles from './User.module.scss';

export const User = ({ name, phone, photo, position, email, id }) => {
  const phoneNumber = parsePhoneNumber(phone);
  return (
    <div className={styles['user-item']}>
      <div className={styles['img-wrap']}>
        <img
          className={styles['img']}
          src={photo}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = photoDefault;
          }}
          alt="user-img"
        />
      </div>
      <div className={styles['user-name']}>{name}</div>
      <div>{position}</div>
      <div>
        <a className={styles.link} href={`mailto:${email}`} data-tip data-for={`email ${id}`}>
          {email}
        </a>
        <ReactTooltip id={`email ${id}`} place="bottom" type="dark" effect="solid">
          {email}
        </ReactTooltip>
      </div>
      <div>
        <a className={styles.link} href={`tel:${phone}`} data-tip data-for={`phone ${id}`}>
          {phoneNumber.formatInternational()}
        </a>
        <ReactTooltip id={`phone ${id}`} place="bottom" type="dark" effect="solid">
          {phoneNumber.formatInternational()}
        </ReactTooltip>
      </div>
    </div>
  );
};
