import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectUsersData } from '../../../features/users/usersSlice';
import { Spinner } from '../../spinner';
import { User } from '../userItem';

import styles from './Users.module.scss';

export const Users = () => {
  const dispatch = useDispatch();
  const { users, status, links } = useSelector(selectUsersData);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const nextUserList = links.next_url;

  const showUserHendler = (link) => {
    dispatch(fetchUsers(link));
  };

  return (
    <section className={styles['users-section']} id="users">
      <div className="container">
        <h2 className="title">Working with GET request</h2>
        {users && users?.length ? (
          <>
            <div className={styles['users-list']}>
              {users.map((user) => (
                <User key={user.id} {...user} />
              ))}
            </div>
          </>
        ) : null}
        {status === 'idle' && nextUserList ? (
          <button
            onClick={() => showUserHendler(nextUserList)}
            className={`${styles.btn} btn`}
            // disabled={!nextUserList}>
          >
            Show more
          </button>
        ) : null}
        {status === 'loading' ? <Spinner /> : null}
      </div>
    </section>
  );
};
