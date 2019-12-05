import React, { useState } from 'react';
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
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState();
  const [cover, setCover] = useState(null);


  
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
          onChange={(e) => setCover(e.target.files[0])}
          style={{ display: 'none' }}
        />
        <TextInp
          type="text"
          name="title"
          areaName="title"
          placeholder="Название"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextInp
          type="text"
          name="author"
          areaName="author"
          placeholder="Автор"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
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
