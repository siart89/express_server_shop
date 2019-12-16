import React from 'react';
import PropTypes from 'prop-types';
import {
  ProductCont,
  ProdTitle,
  ProdPrice,
  ProdAuthor,
} from './styles';
import { RowBookCover } from '../../../cart/cartStyles';

const Product = ({
  url,
  title,
  price,
  author,
}) => (
  <ProductCont>
    <div style={{ padding: '30px', background: '#F5F5F5'}}>
      <RowBookCover src={url} />
    </div>
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

Product.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Product;
