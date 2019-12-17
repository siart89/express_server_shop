import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ProductCont,
  ProdTitle,
  ProdPrice,
  ProdAuthor,
  CoverBox,
  ProdCover,
} from './styles';

const Product = ({
  url,
  title,
  price,
  author,
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <ProductCont
      hover={isHover}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CoverBox hover={isHover}>
        <ProdCover src={url} />
      </CoverBox>
      <ProdTitle>
        {title}
      </ProdTitle>
      <ProdAuthor>
        {author}
      </ProdAuthor>
      <ProdPrice>
        {price}
      </ProdPrice>
    </ProductCont>
  );
};

Product.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Product;
