import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ListControls,
  ListControlsTitle,
  ControlsMainText,
  Select,
} from '../productListStyles';
import setSortType from '../../../../store/actions/setSortType';

const typesOfSort = [{
  name: 'По умолчанию',
  value: 'created_at',
},
{
  name: 'Автору',
  value: 'author',
},
{
  name: 'Цене',
  value: 'price',
},
{
  name: 'Имени',
  value: 'title',
}

]
const Sort = () => {
  const { sort } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <ListControls>
      <ListControlsTitle>
        Сортирова по:
      </ListControlsTitle>
      <ControlsMainText>
        <Select
          name="typeFilter"
          value={sort}
          onChange={(e) => dispatch(setSortType(e.target.value))}
        >
          {typesOfSort.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.name}
            </option>
          ))}
        </Select>
      </ControlsMainText>
    </ListControls>
  );
}

export default Sort;
