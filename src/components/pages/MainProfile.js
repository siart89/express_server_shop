import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  ProfileWrapper,
  ProfLinks,
  ProfContentWrapper,
  LinksWrapper,
  ProfContent,
} from '../profile/profileStyles/styles';
import ProfileInfo from '../profile/profileElements/ProfileInfo';
import MyBooks from '../profile/profileElements/myBooks/MyBooks';
import Favorites from '../favorites/Favorites';
import setUrl from '../../store/actions/setUrl';
import toLocalStorage from '../../store/actions/toLocalStorage';
import ProfileBoard from '../profile/mainBoard/ProfileBoard';


const MainProfile = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const isBooks = useRouteMatch('/profile/mybooks');
  const isFavor = useRouteMatch('/profile/favorites');

  useEffect(() => {
    const verifyUser = async () => {
      const resp = await fetch('/user/verify', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))} ${JSON.parse(localStorage.getItem('refreshToken'))}`,
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        if (result.token) {
          dispatch(toLocalStorage(result.token, result.refreshToken));
        }
        dispatch(setUrl(result.avatar));
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    verifyUser();
  }, [dispatch]);

  return (
    <>
      {isAuth ? (
        <ProfileWrapper>
          <ProfileInfo />
          <ProfContentWrapper>
            <LinksWrapper>
              <ProfLinks
                to="/profile/mybooks"
                isactive={isBooks}
              >
                Мои книги
              </ProfLinks>
              <ProfLinks
                to="/profile/favorites"
                isactive={isFavor}
              >
                Избранное
              </ProfLinks>
            </LinksWrapper>
            <ProfContent>
              <Switch>
                <Route path="/profile/mybooks" component={MyBooks} />
                <Route path="/profile/favorites" component={Favorites} />
                <Route path="/" component={ProfileBoard} />
              </Switch>
            </ProfContent>
          </ProfContentWrapper>
        </ProfileWrapper>
      ) : (
        <h1 style={{ textAlign: 'center' }}>
            Loading...
        </h1>
      )}
    </>
  );
};

export default MainProfile;
