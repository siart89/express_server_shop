import React from 'react';
import PropTypes from 'prop-types';
import ListElement from './ListElement';
import { MyBLWrapper } from '../../profileStyles/myBooksStyles';

const MyBookList = ({ list }) => (
  <MyBLWrapper>
    {list.map((book) => (
      <ListElement
        key={book.id}
        cover={book.cover}
        title={book.title}
        author={book.author}
        price={book.price}
        id={book.id}
      />
    ))}
  </MyBLWrapper>
);


MyBookList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default MyBookList;
