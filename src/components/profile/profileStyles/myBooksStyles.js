import styled from 'styled-components';

const MyBooksWrapper = styled.div`
  width:100%;
`;

const MyBooksForm = styled.form`
  display:grid;
  grid-template-columns: 170px 300px;
  grid-auto-rows: minmax(30px, auto);
  grid-gap: 15px;
  grid-template-areas:
  'cover title'
  'cover author'
  'cover price'
  'cover description'
  'cover description'
  '... button';
`;

const CoverInp = styled.label`
  grid-area: cover;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  width:100%;
  min-height:100%;
  border: 1px dashed #000;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;

  & span {
    font-size: 15px;
    line-height: 16px;
    opacity: 0.8;
    font-style: italic;
    color: #A0A4A5;
    text-align: center;
  }
`;

const TextInp = styled.input`
 grid-area: ${(props) => props.areaName};
 border:1px solid #595959;
 font-size: 12px;
 font-style: italic;
 line-height: 1.25;
 padding-left: 7px;
 border-radius: 3px;
`;

const PriceInp = styled(TextInp)`
 grid-area: price;
`;

const TextArea = styled.textarea`
 grid-area: description;
 resize: none;
 border:1px solid #595959;
 border-radius:3px;
 font-size: 12px;
 font-style: italic;
 padding: 7px;
`;
const SubmitButton = styled.button`
  grid-area: button;
  background: none;
  outline:none;
  border: none;
  cursor:pointer;
  border: 1px solid #595959;
  box-shadow: 1px 2px 2px #000;
  width: 60%;
  border-radius: 3px;
  justify-self: left;
  font-size: 14px;
  font-weight: bold;
  color: #2e2e2e;
`;
export {
  MyBooksWrapper,
  MyBooksForm,
  CoverInp,
  TextInp,
  PriceInp,
  TextArea,
  SubmitButton,
};
