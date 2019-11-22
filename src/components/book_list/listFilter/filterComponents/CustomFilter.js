import React from 'react';
import {
  CustomFilterForm,
  FilterTitle,
  PriceFilter,
  InputBox,
  PriceInpLabel,
  PriceInput,
  CheckBoxLabel,
  InputCheckBox,
} from '../listFilterStyles';

const CustomFilter = () => (
  <CustomFilterForm name="custom_filter">
    <FilterTitle>
      Цена
    </FilterTitle>
    <PriceFilter>
      <InputBox>
        <PriceInpLabel htmlFor="min_price">от</PriceInpLabel>
        <PriceInput id="min_price" />
        <PriceInpLabel htmlFor="max_price">до</PriceInpLabel>
        <PriceInput id="max_price" />
      </InputBox>
      <InputBox style={{ marginTop: '15px' }}>
        <CheckBoxLabel htmlFor="sale">
          <InputCheckBox />
          <input type="checkbox" id="sale" />
          Товары со скидкой
        </CheckBoxLabel>
      </InputBox>
    </PriceFilter>
  </CustomFilterForm>
);

export default CustomFilter;
