import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  InfoWrapper,
  Title,
  LogOutButton,
} from '../profileStyles/styles';
import Avatar from './Avatar';

const ProfileInfo = () => {
  const userInfo = useSelector((state) => state.isAuth);

  return (
    <InfoWrapper>
      <Avatar url={userInfo.avatar} />
      <Title>
        {userInfo.name}
      </Title>
      <Title>
        {userInfo.mail}
      </Title>
      <LogOutButton>
        Выйти
      </LogOutButton>
    </InfoWrapper>
  );
};

export default ProfileInfo;
