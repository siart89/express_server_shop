import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { basket } from 'react-icons-kit/ikons/basket';
import { starO } from 'react-icons-kit/fa/starO';
import {
  HeaderMidLogo,
  SearchInput,
  HeaderMidRight,
  Favorites,
  Cart,
  HeaderMidWrapper,
  SearchForm,
} from '../headerStyles';

const HeaderMid = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <HeaderMidWrapper>
      <HeaderMidLogo>
        <span>Take your book from</span>
        <span>MyBookcase</span>
      </HeaderMidLogo>
      <SearchForm>
        <SearchInput
          isFocus={isFocus}
          type="text"
          placeholder="Поиск"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </SearchForm>
      <HeaderMidRight>
        <Favorites>
          <Icon icon={starO} size={22} />
        </Favorites>
        <Cart>
          <Icon icon={basket} size={22} />
        </Cart>
      </HeaderMidRight>
    </HeaderMidWrapper>
  );
};

export default HeaderMid;
