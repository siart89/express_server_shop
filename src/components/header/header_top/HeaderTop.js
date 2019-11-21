import React from 'react';

import {
  HeaderTopWrapper,
  HeaderTopInner,
  HeaderLogo,
  HeaderRight,
  HeaderTopLinks,
  HeaderTopText,
} from '../headerStyles';

const HeaderTop = () => (
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
        <HeaderTopText>
          Войти
        </HeaderTopText>
      </HeaderRight>
    </HeaderTopInner>
  </HeaderTopWrapper>
);

export default HeaderTop;
