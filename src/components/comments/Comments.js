import React from 'react';
import { PopUpWrapper } from '../popUp/styles/styles';
import {
  CommentWrapper,
  FlexBox,
  CommentMainText,
} from './styles';

const Comments = () => {

  return (
    <PopUpWrapper>
      <CommentWrapper>
        <FlexBox>
          <CommentMainText>
            Новый отзыв
          </CommentMainText>
          <CommentMainText>
            Называние книги
          </CommentMainText>
        </FlexBox>
        <form>
          <FlexBox>
            <label htmlFor="comment">
              <CommentMainText>
                Комментарий
              </CommentMainText>
              <textarea id="comment" />
            </label>
            <label htmlFor="name">
              <CommentMainText>
                Как Вас зовут ?
              </CommentMainText>
              <input type="text" id="name" />
            </label>
            <button type="submit">
              Отправить отзыв
            </button>
          </FlexBox>
        </form>
      </CommentWrapper>
    </PopUpWrapper>
  );
};

export default Comments;
