import styled, { css } from 'styled-components';
import { FormBtn, Input, CloseBtn } from '../popUp/styles/styles';

const CommentWrapper = styled.div`
  margin: 170px auto;
  display: grid;
  width: 500px;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  border-radius: 5px;
  box-shadow: 0 0 12px #b3b3b3;
  background: #fff;
  padding: 45px 25px;
  position:relative;
`;

const FlexBox = styled.div`
  display:flex;
  flex-direction:column;
`;

const CommentMainText = styled.span`
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  padding-bottom: 7px;
  ${(props) => props.main && css`
    font-size: 16px;
  `};
  ${(props) => props.book && css`
    font-family: 'Roboto', sans-serif;
    color: #a0a4a5;
    font-style: italic;
  `};
`;

const CommentBtn = styled(FormBtn)`
  width: 50%;
  line-height: 43px;
  align-self:center;
  transition: background 0.3s, color 0.3s;
  box-shadow: 0 3px 4px #000;
  &:hover{
    background-color: #42CEE2;
    color: #000;
  }
`;
const NameInp = styled(Input)`
  width: 50%;
  border-radius: 5px;
`;

const ComMainLabel = styled.label`
  margin-top: 12px;
  display:flex;
  flex-direction:column;
`;
const TextField = styled.textarea`
  height: 150px;
  resize: none;
  border-radius: 5px;
  font-size:12px;
  padding: 5px 4px;
`;

const CloseButton = styled(CloseBtn)`
  position:absolute;
  right: 4px;
  top: 5px;
`;
export {
  CommentWrapper,
  FlexBox,
  CommentMainText,
  CommentBtn,
  NameInp,
  ComMainLabel,
  TextField,
  CloseButton,
};
