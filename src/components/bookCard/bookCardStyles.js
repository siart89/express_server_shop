import styled from 'styled-components';
import { ProfileWrapper } from '../profile/profileStyles/styles';

const BookCardWrapper = styled(ProfileWrapper)`
  grid-column-gap: 150px;
  grid-template-columns: 2fr 1fr;
`;
// BOOK INFO STYLES
const BookInfoWrapper = styled.div`
  display:flex;
  flex-direction: column;
`;

const BookTitle = styled.h1`
  font-size: 30px;
  font-weight: 500;
  line-height: 1.17;
  color: #181717;
  margin-bottom: 7px;
`;

const BookStyledText = styled.p`
  font-size: 17px;
  font-style: italic;
  line-height: 1.18;
  color: #42CEE2;
  font-weight: normal;
`;

const BookMainText = styled.p`
  font-size: 15px;
  line-height: 1.67;
  color: #181717;
`;

const BookBigCoverBox = styled.div`
  height: 460px;
  width: 460px;
  margin: 45px 0 45px auto;
`;

const CoverImg = styled.img`
  max-width:100%;
  max-height:100%;
`;

// BOOK PRICE STYLES
const PriceInfoWrapper = styled.div`
  display:flex;
  flex-direction:column;
`;

const PriceTitle = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.17;
  color: #1acee2;
`;

const PriceMainText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #a0a4a5;
  margin: 10px 0;
`;
const PriceBtn = styled.button`
  width: 260px;
  height: 52px;
  background-color: #42cee2;
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
  border:none;
`;

export {
  BookCardWrapper,
  BookInfoWrapper,
  PriceInfoWrapper,
  BookTitle,
  BookStyledText,
  BookMainText,
  BookBigCoverBox,
  CoverImg,
  PriceTitle,
  PriceMainText,
  PriceBtn,
};
