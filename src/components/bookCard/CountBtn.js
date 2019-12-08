import React from 'react';
import PropTypes from 'prop-types';
import { CountBtnWrapper, IncDecBtn, CountText } from './bookCardStyles';

const CountBtn = ({ count, decOnClick, incOnClick }) => (
  <CountBtnWrapper>
    <IncDecBtn onClick={() => decOnClick(count)}>
      -
    </IncDecBtn>
    <CountText>
      {count}
    </CountText>
    <IncDecBtn onClick={() => incOnClick(count)}>
      +
    </IncDecBtn>
  </CountBtnWrapper>
);

CountBtn.propTypes = {
  count: PropTypes.number.isRequired,
  decOnClick: PropTypes.func.isRequired,
  incOnClick: PropTypes.func.isRequired,
};
export default CountBtn;
