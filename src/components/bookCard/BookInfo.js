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

const BookInfo = ({
  title,
  author,
  cover,
  description,
}) => (
  <BookInfoWrapper>
    <BookTitle>
      {title}
    </BookTitle>
    <BookStyledText>
      {author}
    </BookStyledText>
    <BookBigCoverBox>
      <CoverImg src={cover} />
    </BookBigCoverBox>
    <BookMainText>
      {description}
    </BookMainText>
  </BookInfoWrapper>
);

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default BookInfo;
