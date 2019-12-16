import styled from 'styled-components';
import { PriceText } from '../../../profile/profileStyles/myBooksStyles';
import { RowCursiveText } from '../../../cart/cartStyles';

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
};
