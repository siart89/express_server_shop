import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  MyBooksWrapper,
  MyBooksForm,
  CoverInp,
  TextInp,
  PriceInp,
  TextArea,
  SubmitButton,
} from '../../profileStyles/myBooksStyles';
import MyBookList from './MyBookList';

const MyBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState();
  const [url, setUrl] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [forUpdate, setForUpdate] = useState(false);

  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const fetchBookList = async () => {
      const resp = await fetch(`/api/user/${authUser.id}/booklist`);
      if (resp.ok) {
        const result = await resp.json();
        setBookList(result);
      }
    };
    fetchBookList();
  }, [authUser.id, forUpdate]);

  const handleFetchData = async (e) => {
    e.preventDefault();
    const bookInfo = {
      title,
      author,
      price,
      description,
      url,
    };

    const resp = await fetch('/api/user/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
      body: JSON.stringify(bookInfo),
    });
    if (resp.ok) {
      setTitle('');
      setAuthor('');
      setPrice('');
      setDescription('');
      setUrl('');
      setForUpdate(!forUpdate);
    }
  };

  const handleFetchCover = async (e) => {
    const formData = new FormData();
    formData.append('cover', e.target.files[0]);
    const resp = await fetch('/api/book/cover', {
      method: 'POST',
      body: formData,
    });
    if (resp.ok) {
      const result = await resp.json();
      setUrl(result.path);
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <>
      <MyBooksWrapper>
        <MyBooksForm onSubmit={handleFetchData} name="my-books">
          <CoverInp htmlFor="cover" url={url}>
            {!url && (
              <span>
                {showMessage ? 'Сбой, повторите попытку' : 'Добавить обложку'}
              </span>
            )}
          </CoverInp>
          <input
            type="file"
            name="cover"
            id="cover"
            onChange={handleFetchCover}
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
            value={price}
          />
          <TextArea
            placeholder="Фрагмент текста"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <SubmitButton>Разместить</SubmitButton>
        </MyBooksForm>
      </MyBooksWrapper>
      <MyBookList list={bookList} />
    </>
  );
};

export default MyBooks;
