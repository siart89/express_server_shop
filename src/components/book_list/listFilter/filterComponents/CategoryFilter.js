import React from 'react';
import { useSelector } from 'react-redux';
import { FilterForm, FilterTitle, Label } from '../listFilterStyles';

const CategoryFilter = () => {
  const category = useSelector((state) => state.category);
  return (
    <FilterForm name="category">
      <FilterTitle>
        Категории
      </FilterTitle>
      {category.map((item) => (
        <Label key={item} htmlFor={item}>
          <input type="radio" name="category" id={item} />
          {item}
        </Label>
      ))}
    </FilterForm>
  );
};


export default CategoryFilter;
