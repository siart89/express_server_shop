import React from 'react';
import PropTypes from 'prop-types';
import {
  BookWrapper,
  InnerMinWrapper,
  InnerMaxWrapper,
  SmallCover,
  PriceText,
} from '../../profileStyles/myBooksStyles';

const ListElement = ({
  cover,
  title,
  author,
  price,
}) => (
  <BookWrapper>
    <InnerMinWrapper>
      <SmallCover url={cover} />
    </InnerMinWrapper>
    <InnerMaxWrapper>
      <span className="title">{title}</span>
      <span className="author">{author}</span>
    </InnerMaxWrapper>
    <InnerMinWrapper>
      <PriceText>
        {price}
      </PriceText>
    </InnerMinWrapper>
  </BookWrapper>
);


ListElement.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
export default ListElement;
