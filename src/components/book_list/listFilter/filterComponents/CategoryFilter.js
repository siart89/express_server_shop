import React from 'react';
import { FilterForm, FilterTitle, Label } from '../listFilterStyles';

const category = ['Бестселлеры', 'Искусство, дизайн и мода', 'Бизнесс-книги',
  'Детские книги', 'Художественная литература', 'Гуманитарные и общественные науки', 'Научно-популярные книги',
  'Школьные учебники', 'Хобби, дом и досуг', 'Здоровье, красота и спорт'];

const CategoryFilter = () => (
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

export default CategoryFilter;
