import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  PriceInfoWrapper,
  PriceTitle,
  PriceMainText,
  PriceBtn,
  CountBox,
} from './bookCardStyles';
import CountBtn from './CountBtn';
import addToCart from '../../store/actions/addToCart';
import decrement from '../../store/actions/decrement';
import increment from '../../store/actions/increment';

const PriceInfo = ({ price }) => {
  const [count, setCount] = useState(1);
  const { id: bookId } = useParams();
  const { id: userId } = useSelector((state) => state.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [match, setMatch] = useState(false);
  const [cartCount, setCartCount] = useState(null);

  const handleIncOnClick = (num) => {
    if (num <= 30) {
      setCount(num + 1);
    }
  };

  const handleDecOnClick = (num) => {
    if (num >= 2) {
      setCount(num - 1);
    }
  };

  const handleAddToCardOnClick = () => {
    const info = {
      bookId,
      userId,
      count,
      price,
    };
    dispatch(addToCart(info));
  };

  useEffect(() => {
    const checkItemInCart = () => {
      cart.forEach((item) => {
        if (item.bookId === bookId) {
          setMatch(true);
        }
      });
    };
    checkItemInCart();
  }, [cart, bookId]);

  useEffect(() => {
    cart.forEach((item) => {
      if (item.bookId === bookId) {
        setCartCount(item.count);
      }
    });
  }, [bookId, cart]);

  const decOnClick = match ? () => { dispatch(decrement(bookId)); } : handleDecOnClick;
  const incOnClick = match ? () => { dispatch(increment(bookId)); } : handleIncOnClick;
  return (
    <PriceInfoWrapper>
      <PriceTitle>
        {price}
      </PriceTitle>
      <CountBox>
        <PriceMainText>
          Количество
        </PriceMainText>
        <CountBtn
          count={match ? cartCount : count}
          decOnClick={decOnClick}
          incOnClick={incOnClick}
        />
      </CountBox>
      {match ? (
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <PriceBtn>
            Перейти в корзину
          </PriceBtn>
        </Link>
      ) : (
        <PriceBtn onClick={handleAddToCardOnClick}>
            Добавить в корзину
        </PriceBtn>
      )}
    </PriceInfoWrapper>
  );
};

PriceInfo.propTypes = {
  price: PropTypes.string.isRequired,
};

export default PriceInfo;
