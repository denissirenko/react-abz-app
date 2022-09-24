import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  fetchUsers,
  resetUsers,
  setRegistrated,
  selectUsersData,
} from '../../../features/users/usersSlice';
import useFetch from './useFetch';
import { schema } from './validateForm';

import InputMask from 'react-input-mask';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import successRegistered from '../../../assets/success-image.svg';
import styles from './Form.module.scss';
import classNames from 'classnames';

export const SignUpForm = () => {
  const [fileName, setFileName] = useState('Upload your photo');
  const dispatch = useDispatch();
  const { registrated } = useSelector(selectUsersData);
  const { token, positions } = useFetch();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    var formData = new FormData();
    formData.append('position_id', data.position_id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('photo', data.photo[0]);
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: formData,
      headers: { Token: token },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          dispatch(resetUsers());
          dispatch(fetchUsers());
          dispatch(setRegistrated());
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // set fileName
  const watchFile = watch('photo');
  React.useEffect(() => {
    if (watchFile && watchFile.length) {
      setFileName(watchFile[0]?.name);
    }
  }, [watchFile]);

  // set value input phone

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    setValue('phone', phoneNumber?.number, { shouldValidate: true });
  };

  return (
    <section className={styles['form-section']} id="signUp">
      <div className="container">
        {registrated ? (
          <>
            <h2 className="title">User successfully registered</h2>
            <img src={successRegistered} alt="successImg" />
          </>
        ) : (
          <>
            <h2 className="title">Working with POST request</h2>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              encType="multipart/form-data">
              <div
                className={classNames(styles['form-control'], {
                  [styles.error]: errors.name?.message,
                })}>
                <input
                  className={styles['form-input']}
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register('name')}
                />
                <label className={styles['form-label']} htmlFor="name">
                  Your name
                </label>
                <p className={styles['form-helper']}>{errors.name?.message}</p>
              </div>

              <div
                className={classNames(styles['form-control'], {
                  [styles.error]: errors.email?.message,
                })}>
                <input
                  className={styles['form-input']}
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register('email')}
                />
                <label className={styles['form-label']} htmlFor="email">
                  Email
                </label>
                <p className={styles['form-helper']}>{errors.email?.message}</p>
              </div>

              <div
                className={classNames(styles['form-control'], {
                  [styles.error]: errors.phone?.message,
                })}>
                <InputMask
                  mask="+38 (099) 999 9999"
                  className={styles['form-input']}
                  id="phoneVisual"
                  placeholder="Phone"
                  onChange={(event) => normalizePhoneNumber(event.target.value)}
                  type="tel"
                />
                <label className={styles['form-label']} htmlFor="phoneVisual">
                  Phone
                </label>
                <input id="phone" type="hidden" name="phone" {...register('phone')} />
                <p className={styles['form-helper']}>{errors.phone?.message}</p>
              </div>

              {positions && (
                <div className={styles['radio-group']}>
                  <div className={styles['radio-group-title']}>Select your position</div>
                  {positions.map(({ id, name }) => (
                    <div className={styles['radio-item']} key={id}>
                      <input
                        className={styles['radio-input']}
                        type="radio"
                        id={id}
                        name="position_id"
                        {...register('position_id')}
                        value={id}
                      />
                      <label className={styles['radio-label']} htmlFor={id}>
                        {name}
                      </label>
                    </div>
                  ))}
                  <p className={styles['form-helper']}>{errors.position_id?.message}</p>
                </div>
              )}

              <div
                className={classNames(styles['file-group'], {
                  [styles['file-error']]: errors.photo?.message,
                })}>
                <div className={styles['label-wrap']}>
                  <label className={styles.label} htmlFor="file">
                    Upload
                  </label>
                  <div className={styles['file-text']}>
                    {errors.photo ? 'Upload your photo' : fileName}
                  </div>
                  <input id="file" name="photo" type="file" {...register('photo')} />
                </div>
                <p className={styles['form-helper']}>{errors.photo?.message}</p>
              </div>

              <button
                className="btn"
                style={{ margin: '0 auto' }}
                type="submit"
                disabled={!isValid}>
                Sign up
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
