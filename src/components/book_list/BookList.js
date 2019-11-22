import React from 'react';
import ListWrapper from './bookListStyles';
import ListFilter from './listFilter/ListFilter';
import ProductList from './products/ProductList';

const BookList = () => (
  <ListWrapper>
    <ListFilter />
    <ProductList />
  </ListWrapper>
);

export default BookList;
