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
  const [url, setUrl] = useState(null);

  const handleFetchData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', cover);
    formData.append('author', author);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    const response = await fetch('/user/books', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: formData,
    });
    const result = await response.json();
    setUrl(result.path);
    setCover(null);
  };
  return (
    <MyBooksWrapper>
      <MyBooksForm onSubmit={handleFetchData} name="my-books">
        <CoverInp htmlFor="cover" url={url}>
          {!url && <span> Добавить обложку </span>}
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
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextArea
          placeholder="Фрагмент текста"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <SubmitButton>Разместить</SubmitButton>
      </MyBooksForm>
    </MyBooksWrapper>
  );
};

export default MyBooks;
