import React from 'react';
import { useSelector } from 'react-redux';
import { BackgroundWrapper, CartWrapper } from '../cart/cartStyles';
import CartRow from '../cart/CartRow';

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <BackgroundWrapper>
      <CartWrapper>
        {cart.map((item) => (
          <CartRow
            key={item.bookId}
            id={item.bookId}
            count={item.count}
          />
        ))}
      </CartWrapper>
    </BackgroundWrapper>
  );
};

export default Cart;
