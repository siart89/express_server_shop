import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BackgroundWrapper,
  CartWrapper,
  CartTitle,
  CartSubTitle,
} from '../cart/cartStyles';
import CartRow from '../cart/CartRow';
import CartResult from '../cart/CartResult';
import formatPrice from '../actions/formatPrice';
import CartTitleRow from '../cart/CartTitleRow';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate total price
    const reduceMath = (res, cur) => res + (formatPrice(cur.price) * cur.count);
    const result = cart.reduce(reduceMath, 0);
    setTotalPrice(result);
  }, [cart]);
  return (
    <>
      <BackgroundWrapper>
        <CartWrapper>
          <CartTitle>
            Корзина
          </CartTitle>
          <CartSubTitle>
            {`${cart.length} ед. товара`}
          </CartSubTitle>
          <CartSubTitle
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            btn
          >
            Очистить корзину
          </CartSubTitle>
          <CartTitleRow />
          {cart.map((item) => (
            <CartRow
              key={item.bookId}
              id={item.bookId}
              count={item.count}
            />
          ))}
        </CartWrapper>
      </BackgroundWrapper>
      <CartResult total={totalPrice} />
    </>
  );
};

export default Cart;
