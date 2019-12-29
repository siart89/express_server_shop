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
  Select,
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
  const [category, setCategory] = useState('');

  const authUser = useSelector((state) => state.currentUser);
  const categories = useSelector((state) => state.category);

  // Get current user book list from db
  useEffect(() => {
    const fetchBookList = async () => {
      const resp = await fetch(`/api/profile/user/${authUser.id}/booklist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (resp.ok) {
        const result = await resp.json();
        setBookList(result);
      }
    };
    fetchBookList();
  }, [authUser.id, forUpdate]);

  // Send info about the book to the DB
  const handleFetchData = async (e) => {
    e.preventDefault();
    const bookInfo = {
      title,
      author,
      price,
      description,
      cover: url,
      category,
      UserId: authUser.id,
    };

    const resp = await fetch('/api/prod/add/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))} ${JSON.parse(localStorage.getItem('refreshToken'))}`,
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
  // SEND the book cover and get back path right away
  const handleFetchCover = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('cover', e.target.files[0]);
      const resp = await fetch('/api/prod/cover', {
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
    }
  };
  const checkValueIsNum = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      setPrice(e.target.value);
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
          <Select
            name="category"
            areaName="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
          >
            {categories.map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </Select>
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
            required
          />
          <TextInp
            type="text"
            name="author"
            areaName="author"
            placeholder="Автор"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            required
          />
          <PriceInp
            type="text"
            name="price"
            placeholder="Цена"
            onChange={checkValueIsNum}
            value={price}
            required
          />
          <TextArea
            placeholder="Фрагмент текста"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <SubmitButton>Разместить</SubmitButton>
        </MyBooksForm>
      </MyBooksWrapper>
      {bookList.length > 0 && <MyBookList list={bookList} />}
    </>
  );
};

export default MyBooks;
