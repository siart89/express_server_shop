import React from 'react';
import {
  BookInfoWrapper,
  BookTitle,
  BookStyledText,
  BookMainText,
  BookBigCoverBox,
  CoverImg,
} from './bookCardStyles';

const BookInfo = ({title, author, cover, description}) => {
  return (
    <BookInfoWrapper>
      <BookTitle>
        {title}
      </BookTitle>
      <BookStyledText>
        {author}
      </BookStyledText>
      <BookBigCoverBox>
        <CoverImg src={cover}/>
      </BookBigCoverBox>
      <BookMainText>
        {description}
      </BookMainText>
    </BookInfoWrapper>
  );
};

export default BookInfo;
