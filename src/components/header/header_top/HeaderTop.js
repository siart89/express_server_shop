import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeaderTopWrapper,
  HeaderTopInner,
  HeaderLogo,
  HeaderRight,
  HeaderTopLinks,
  HeaderTopText,
} from '../headerStyles';
import togglePopUp from '../../../store/actions/togglePopUp';

const HeaderTop = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.currentUser);

  const handleVerify = async () => {
    const resp = await fetch('/secret', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    const result = await resp.json();
    console.log(result);
    if (result.status === 'timeOut') {
      const refreshResp = await fetch('/refresh', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('refreshToken'))}`,
        },
      });
      const refreshResult = await refreshResp.json();
      localStorage.setItem('token', JSON.stringify(refreshResult.token));
      localStorage.setItem('refreshToken', JSON.stringify(refreshResult.refreshToken));
    }
  };

  return (
    <HeaderTopWrapper>
      <HeaderTopInner>
        <HeaderLogo>
          MyBookcase
        </HeaderLogo>
        <HeaderRight>
          <HeaderTopLinks to="/">
            Доставка и оплата
          </HeaderTopLinks>
          <HeaderTopText>
            +7(863) 432-74-47
          </HeaderTopText>
          <HeaderTopLinks to="/">
            Наши магазины
          </HeaderTopLinks>
          {activeUser
            ? (
              <HeaderTopText onClick={handleVerify}>
                {activeUser}
              </HeaderTopText>
            )
            : (
              <HeaderTopText onClick={() => dispatch(togglePopUp())}>
                Войти
              </HeaderTopText>
            )}

        </HeaderRight>
      </HeaderTopInner>
    </HeaderTopWrapper>
  );
};

export default HeaderTop;
