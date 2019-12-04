import styled from 'styled-components';
import { Icon } from 'react-icons-kit';

const PopUpWrapper = styled.div`
    width: 100vw;
    min-height: 100%;
    height:100%;
    background: rgba(0, 0, 0, 0.2);
    position: fixed;
    top:0;
    z-index:10;
`;

const FormBox = styled.div`
   width: 350px;
   margin: 150px auto;
   border-left: 1px solid #e5e5e5;
   border-right: 1px solid #e5e5e5;
   background:#fff;
   padding: 15px;
`;
const FormBoxTop = styled.div`
  display:flex;
  justify-content:flex-start;
  padding-bottom:15px;
  align-items:center;
`;

const LinksLabel = styled.label`
  text-decoration:none;
  color:${(props) => (props.reg ? '#000' : '#42CEE2')};
  cursor:pointer;
`;

const CloseBtn = styled.button`
  background: none;
  width: 25px;
  height: 25px;
  border:none;
  outline:none;
  margin-left: auto;
  cursor: pointer;
`;
const CloseIcon = styled(Icon)`
  &:hover{
    color:#42CEE2;
  }
`;

const Form = styled.form`
  width:300px;
  margin: 0 auto;
`;

const FormTitle = styled.p`
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const FormBtn = styled.button`
  font-size: 14px;
  line-height: 56px;
  display: inline-block;
  width: 100%;
  background-color: #181616;
  color: #FFFFFF;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  border: none;
  margin-top: 25px;
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 38px;
  height: 38px;
  border: solid 1px #b7b7b7;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
`;

const Label = styled.label`
  color:red;
  width:100%;
  display:inline-block;
`;

const Div = styled.div`
  margin-top: 8px;
`;

export {
  PopUpWrapper,
  Form,
  Div,
  FormBox,
  Label,
  Input,
  FormTitle,
  FormBoxTop,
  LinksLabel,
  CloseBtn,
  FormBtn,
  CloseIcon,
};
