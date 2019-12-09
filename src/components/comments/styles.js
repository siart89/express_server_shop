import styled from 'styled-components';

const CommentWrapper = styled.div`
  margin: 70px auto;
  display: grid;
  width: 500px;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
`;

const FlexBox = styled.div`
  display:flex;
  flex-direction:column;
`;

const CommentMainText = styled.span`
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
`;

export {
  CommentWrapper,
  FlexBox,
  CommentMainText,
};
