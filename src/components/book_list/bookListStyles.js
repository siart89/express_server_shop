import styled from 'styled-components';

const ListWrapper = styled.section`
  display:grid;
  margin: 70px auto 49px;
  width: 100%;
  max-width: 1160px;
  grid-column-gap:70px;
  grid-template-columns: minmax(200px, 250px) 1fr;
`;

export default ListWrapper;
