import styled from 'styled-components';

const ProfileWrapper = styled.section`
  display:grid;
  margin: 0 auto 49px;
  width: 100%;
  max-width: 1160px;
  grid-row-gap: 40px;
  grid-auto-rows: 70px 1fr;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  background: #262323;
  align-items:center;

`;

const AvatarBox = styled.div`
  border-radius: 100%;
  border: 1px solid #000;
  width: 60px;
  height: 60px;
  background: #fff;
  margin-left: 25px;
  background-image:url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Title = styled.span`
    font-size: 14px;
    line-height: 25px;
    font-weight: bold;
    color: #A0A4A5;
    padding-left: 25px;
`;

const LogOutButton = styled.div`
    font-size: 14px;
    line-height: 25px;
    font-weight: bold;
    color: #42CEE2;
    margin-left: auto;
    margin-right: 25px;
    cursor: pointer;
   
`;
const InputLabel = styled.label`
  cursor: pointer;
  display:block;
  min-width:100%;
  min-height:100%;
  position: relative;
  border-radius:100%;
  font-size: 34px;
  text-align:center;
`;

const Tip = styled.span`
  position:absolute;
  font-size: 10px;
  color:#000;
  padding:3px 5px; 
  border-radius:5px;
  bottom: -30px;
  right:-140px;
  background:#fff;
`;

const AddInp = styled.input`
  display:none;
`;

const SubmitBtn = styled.button`
  border-radius: 100%;
  width:20px;
  height:20px;
  border:none;
  background:#fff;
  outline:none;
  position:absolute;
  bottom: -30px;
  right: -15px;
  cursor:pointer;
`;

export {
  ProfileWrapper,
  InfoWrapper,
  AvatarBox,
  Title,
  LogOutButton,
  AddInp,
  InputLabel,
  Tip,
  SubmitBtn,
};
