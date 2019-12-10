import React from 'react';
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
} from './styles';

const Comments = ({ title, closeOnClick }) => {

  return (
    <PopUpWrapper>
      <CommentWrapper>
        <FlexBox>
          <CommentMainText main>
            Новый отзыв
          </CommentMainText>
          <CommentMainText book>
            {title}
          </CommentMainText>
        </FlexBox>
        <form>
          <FlexBox>
            <ComMainLabel htmlFor="comment">
              <CommentMainText>
                Комментарий
              </CommentMainText>
              <TextField id="comment" />
            </ComMainLabel>
            <ComMainLabel htmlFor="name">
              <CommentMainText>
                Как вас зовут ?
              </CommentMainText>
              <NameInp type="text" id="name" />
            </ComMainLabel>
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
};

export default Comments;
