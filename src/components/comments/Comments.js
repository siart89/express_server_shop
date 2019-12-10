import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { close } from 'react-icons-kit/fa/close';
import { PopUpWrapper, CloseIcon } from '../popUp/styles/styles';
import {
  CommentWrapper,
  FlexBox,
  CommentMainText,
  CommentBtn,
  ComMainLabel,
  NameInp,
  TextField,
  CloseButton,
  RowGrid,
} from './styles';
import Stars from './Stars';

const Comments = ({ title, closeOnClick, bookId }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState(false);

  const [rating, setRating] = useState(null);

  const handleFetchData = async (e) => {
    e.preventDefault();
    const comment = {
      bookId: +bookId,
      text,
      author,
    };
    const resp = await fetch('/book/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    if (resp.ok) {
      setAuthor('');
      setText('');
      await closeOnClick();
    } else {
      setMessage(true);
    }
  };

  return (
    <PopUpWrapper>
      <CommentWrapper>
        <FlexBox>
          {message ? (
            <CommentMainText alarm>
              Мы не разобрали ваш почерк. Повторите попытку
            </CommentMainText>
          )
            : (
              <CommentMainText main>
                Новый отзыв
              </CommentMainText>
            )}
          <CommentMainText book>
            {title}
          </CommentMainText>
        </FlexBox>
        <form
          onSubmit={handleFetchData}
          onChange={() => setMessage(false)}
        >
          <FlexBox>
            <ComMainLabel htmlFor="comment">
              <CommentMainText>
                Комментарий
              </CommentMainText>
              <TextField
                id="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </ComMainLabel>
            <RowGrid>
              <ComMainLabel htmlFor="author">
                <CommentMainText>
                  Как вас зовут ?
                </CommentMainText>
                <NameInp
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </ComMainLabel>
              <div style={{marginTop: '12px'}}>
                <CommentMainText>
                  Общее впечатление :
                </CommentMainText>
                <Stars setRating={(e) => setRating(e.target.value)} />
              </div>
            </RowGrid>
            <CommentBtn type="submit">
              Отправить отзыв
            </CommentBtn>
          </FlexBox>
        </form>
        <CloseButton onClick={closeOnClick}>
          <CloseIcon icon={close} size={20} />
        </CloseButton>
      </CommentWrapper>
    </PopUpWrapper>
  );
};

Comments.propTypes = {
  title: PropTypes.string.isRequired,
  closeOnClick: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
};

export default Comments;
