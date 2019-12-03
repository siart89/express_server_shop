import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileWrapper } from './profileStyles/styles';
import ProfileInfo from './profileElements/ProfileInfo';
import authOk from '../../store/actions/authOk';

const MainProfile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth.ok);

  useEffect(() => {
    const verifyUser = async () => {
      const resp = await fetch('/secret', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      if (resp.status === 403) {
        const refreshResp = await fetch('/refresh', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('refreshToken'))}`,
          },
        });
        if (refreshResp.ok) {
          const refreshResult = await refreshResp.json();

          localStorage.setItem('token', JSON.stringify(refreshResult.token));
          localStorage.setItem('refreshToken', JSON.stringify(refreshResult.refreshToken));
          // Repeat request after refresh token
          verifyUser();
        } else {
          dispatch({ type: 'AUTH_DENIED' });
        }
      } else {
        const result = await resp.json();
        console.log(result);
        dispatch(authOk(result));
      }
    };
    verifyUser();
  }, [dispatch]);
  return (
    isAuth ? (
      <ProfileWrapper>
        <ProfileInfo />
      </ProfileWrapper>
    ) : (
      <h1 style={{ textAlign: 'center' }}>
          Upps... something happend
      </h1>
    )
  );
};

export default MainProfile;
