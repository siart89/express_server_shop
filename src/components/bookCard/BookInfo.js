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
}) => (
  <BookInfoWrapper>
    <BookTitle>
      {title}
    </BookTitle>
    <RowGrid>
      <BookStyledText>
        {author}
      </BookStyledText>
      <BookRating />
    </RowGrid>
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
