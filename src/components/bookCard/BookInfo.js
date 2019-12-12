import React from 'react';
import PropTypes from 'prop-types';
import {
  BookInfoWrapper,
  BookTitle,
  BookStyledText,
  BookMainText,
  BookBigCoverBox,
  CoverImg,
} from './bookCardStyles';
import BookRating from './BookRating';
import { RowGrid } from '../comments/styles';

const BookInfo = ({
  title,
  author,
  cover,
  description,
  rating,
}) => (
  <BookInfoWrapper>
    <BookTitle>
      {title}
    </BookTitle>
    <RowGrid>
      <BookStyledText>
        {author}
      </BookStyledText>
      <BookRating rating={rating} />
    </RowGrid>
    <BookBigCoverBox>
      <CoverImg src={cover} />
    </BookBigCoverBox>
    <BookMainText>
      {description}
    </BookMainText>
  </BookInfoWrapper>
);
BookInfo.defaultProps = {
  rating: null,
};
BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

export default BookInfo;
