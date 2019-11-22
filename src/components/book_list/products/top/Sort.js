import React from 'react';
import { ListControls, ListControlsTitle, ControlsMainText } from '../productListStyles';

const Sort = () => (
  <ListControls>
    <ListControlsTitle>
      Сортирова по:
    </ListControlsTitle>
    <ControlsMainText>
      <span>По умолчанию</span>
    </ControlsMainText>
  </ListControls>
);
export default Sort;
