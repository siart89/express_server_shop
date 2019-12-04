import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  InfoWrapper,
  Title,
  LogOutButton,
} from '../profileStyles/styles';
import Avatar from './Avatar';
import logOut from '../../../store/actions/logOut';

const ProfileInfo = () => {
  const userInfo = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  return (
    <InfoWrapper>
      <Avatar url={userInfo.avatar} name={userInfo.name} />
      <Title>
        {`${userInfo.name[0].toUpperCase()}${userInfo.name.slice(1)}`}
      </Title>
      <Title>
        {userInfo.mail}
      </Title>
      <LogOutButton onClick={() => dispatch(logOut())}>
        Выйти
      </LogOutButton>
    </InfoWrapper>
  );
};

export default ProfileInfo;
