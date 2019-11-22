import React from 'react';
import { ListControls, NumText } from '../productListStyles';

const num = [1, 2, 3, 4, 5];

const PageNum = () => (
  <ListControls style={{ paddingLeft: '40px' }}>
    {num.map((item) => (
      <NumText key={item}>
        {item}
      </NumText>
    ))}
  </ListControls>
);

export default PageNum;
