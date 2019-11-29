import React from 'react';
import { useDispatch } from 'react-redux';
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
          <HeaderTopText onClick={() => dispatch(togglePopUp())}>
            Войти
          </HeaderTopText>
        </HeaderRight>
      </HeaderTopInner>
    </HeaderTopWrapper>
  );
};

export default HeaderTop;
