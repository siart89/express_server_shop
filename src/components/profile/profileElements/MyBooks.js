import React from 'react';
import {
  MyBooksWrapper,
  MyBooksForm,
  CoverInp,
  TextInp,
  PriceInp,
  TextArea,
  SubmitButton,
} from '../profileStyles/myBooksStyles';

const MyBooks = () => {
  return (
    <MyBooksWrapper>
      <MyBooksForm>
        <CoverInp htmlFor="cover">
          <span>Добавить обложку</span>
        </CoverInp>
        <input
          type="file"
          name="cover"
          id="cover"
          style={{ display: 'none' }}
        />
        <TextInp
          type="text"
          name="title"
          areaName="title"
          placeholder="Название"
        />
        <TextInp
          type="text"
          name="author"
          areaName="author"
          placeholder="Автор"
        />
        <PriceInp
          type="text"
          name="price"
          placeholder="Цена"
        />
        <TextArea placeholder="Фрагмент текста" />
        <SubmitButton>Разместить</SubmitButton>
      </MyBooksForm>
    </MyBooksWrapper>
  );
};

export default MyBooks;
