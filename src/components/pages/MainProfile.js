import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import {
  ProfileWrapper,
  ProfLinks,
  ProfContentWrapper,
  LinksWrapper,
  ProfContent,
} from '../profile/profileStyles/styles';
import ProfileInfo from '../profile/profileElements/ProfileInfo';
import authOk from '../../store/actions/authOk';
import MyBooks from '../profile/profileElements/myBooks/MyBooks';
import verifyUser from '../actions/verifyUser';

const MainProfile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const verify = async () => {
      const result = await verifyUser();
      if (result) {
        dispatch(authOk(result));
      } else {
        dispatch({ type: 'AUTH_DENIED' });
      }
    };
    verify();
  }, [dispatch]);

  return (
    authUser.ok ? (
      <ProfileWrapper>
        <ProfileInfo />
        <ProfContentWrapper>
          <LinksWrapper>
            <ProfLinks to="/profile/mybooks">Мои книги</ProfLinks>
            <ProfLinks to="/profile/mybooks">Прочее</ProfLinks>
          </LinksWrapper>
          <ProfContent>
            <Switch>
              <Route path="/profile/mybooks" component={MyBooks} />
            </Switch>
          </ProfContent>
        </ProfContentWrapper>
      </ProfileWrapper>
    ) : (
      <h1 style={{ textAlign: 'center' }}>
          Loading...
      </h1>
    )
  );
};

export default MainProfile;
