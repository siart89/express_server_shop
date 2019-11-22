import React from 'react';
import { ListControls, ControlsMainText, ListControlsTitle } from '../productListStyles';

const Count = () => (
  <ListControls>
    <ControlsMainText>
      <span>1 - 22 </span>
    </ControlsMainText>
    <ListControlsTitle>
      из 35788 товаров
    </ListControlsTitle>
  </ListControls>
);

export default Count;
