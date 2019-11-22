import React from 'react';
import { FilterWrapper } from './listFilterStyles';
import CategoryFilter from './filterComponents/CategoryFilter';
import CustomFilter from './filterComponents/CustomFilter';

const ListFilter = () => (
  <FilterWrapper>
    <h1>Книги</h1>
    <CategoryFilter />
    <CustomFilter />
  </FilterWrapper>
);

export default ListFilter;
