import styled, { css } from 'styled-components';
import { PriceText } from '../../../profile/profileStyles/myBooksStyles';
import { RowCursiveText, RowBookCover } from '../../../cart/cartStyles';

const ProdGridBox = styled.div`
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 380px;
  grid-gap: 15px;
  margin-top: 45px;
`;

const ProductCont = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 50px 25px 35px;
  min-width: 210px;
  grid-row-gap: 5px;
  transition: 0.2s ease-in;
  ${(props) => props.hover && css`
  grid-row-gap: 0;
  `}
`;
const CoverBox = styled.div`
  background: #F5F5F5;
  display:flex;
  justify-content:center;
  align-items: center;
  ${(props) => props.hover && css`
    height: 90%;
  `};
  
`;
const ProdCover = styled(RowBookCover)`
  width: 150px;
  height: 200px;
`;
const ProdTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.43;
  color: #181616; 
  align-self: center;
`;
const ProdPrice = styled(PriceText)`
  font-size: 16px;
  align-self: center;
`;
const ProdAuthor = styled(RowCursiveText)`
  padding: 0;
`;

export {
  ProdGridBox,
  ProductCont,
  ProdTitle,
  ProdPrice,
  ProdAuthor,
  CoverBox,
  ProdCover,
};
