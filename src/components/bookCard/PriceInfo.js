import React from 'react';
import {
  PriceInfoWrapper,
  PriceTitle,
  PriceMainText,
  PriceBtn,
} from './bookCardStyles';

const PriceInfo = ({ price }) => {
  return (
    <PriceInfoWrapper>
      <PriceTitle>
        {price}
      </PriceTitle>
      <PriceMainText>
        Количество
      </PriceMainText>
      <PriceBtn>
        Купить
      </PriceBtn>
    </PriceInfoWrapper>
  );
};

export default PriceInfo;
