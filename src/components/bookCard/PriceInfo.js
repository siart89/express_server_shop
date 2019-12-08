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

const PriceInfo = ({ price }) => {
  const [count, setCount] = useState(1);
  const { id: bookId } = useParams();
  const { id: userId } = useSelector((state) => state.authUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [match, setMatch] = useState(false);

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
          count={count}
          decOnClick={handleDecOnClick}
          incOnClick={handleIncOnClick}
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
