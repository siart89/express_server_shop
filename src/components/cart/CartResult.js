import React from 'react';
import PropTypes from 'prop-types';
import { ruble } from 'react-icons-kit/fa/ruble';
import { Icon } from 'react-icons-kit';
import { WhiteBGWrapper, CartTitle, ResultWrapper } from './cartStyles';
import { PriceBtn } from '../bookCard/bookCardStyles';

const CartResult = ({ total }) => (
  <WhiteBGWrapper>
    <ResultWrapper>
      <CartTitle style={{ marginBottom: '0' }}>Общая стоимость :</CartTitle>
      <CartTitle>
        {total}
        <Icon icon={ruble} />
      </CartTitle>
      <PriceBtn> Оформить заказ</PriceBtn>
    </ResultWrapper>
  </WhiteBGWrapper>
);

CartResult.propTypes = {
  total: PropTypes.number.isRequired,
};
export default CartResult;
