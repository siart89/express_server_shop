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
const InputLabel = styled.label.attrs((props) => ({
  color: props.isOnIn ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.2)',
}))`
  cursor: pointer;
  display:block;
  width:25px;
  height:25px;
  position: relative;
  border-radius:100%;
&::before, &::after{
  content:"";
  display:block;
  position:absolute;
  width: 2px;
  height:22px;
  background-color: ${(props) => props.color};
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  cursor: pointer;
  transition: background 0.3s ease-in;
}
&::after{
  width: 22px;
  height:2px;
}
`;

const Tip = styled.span`
  position:absolute;
  font-size: 10px;
  color:#e6d9b5;
  bottom: -20px;
  right:-20px;
`;

const AddInp = styled.input`
  display:none;
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
};
