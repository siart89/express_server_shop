import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import verifyUser from '../actions/verifyUser';

const MainProfile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);

  useEffect(() => {
    if (verifyUser()) dispatch({ type: 'AUTH_OK' });
    else dispatch({ type: 'AUTH_DENIED' });
  }, [dispatch]);
  return (
    isAuth ? (
      <h1>Welcome</h1>
    ) : (
      <h1>
          good bye
      </h1>
    )
  );
};

export default MainProfile;
