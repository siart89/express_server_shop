import React from 'react';
import { TopWrapper } from '../productListStyles';
import Sort from './Sort';
import Count from './Count';
import PageNum from './PageNum';

const ProductListTop = () => (
  <TopWrapper>
    <Sort />
    <Count />
    <PageNum />
  </TopWrapper>

);


export default ProductListTop;
