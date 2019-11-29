import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close } from 'react-icons-kit/fa/close';
import {
  PopUpWrapper,
  FormBox,
  FormBoxTop,
  LinksLabel,
  CloseBtn,
  CloseIcon,
} from './styles/styles';
import SignIn from './SignIn';
import togglePopUp from '../../store/actions/togglePopUp';
import LogIn from './LogIn';

const PopUp = () => {
  const dispatch = useDispatch();
  const [reg, setReg] = useState(true);
  const isReg = useSelector((state) => state.isReg);

  useEffect(() => {
    setReg(!isReg);
  }, [isReg]);

  return (
    <PopUpWrapper>
      <FormBox>
        <FormBoxTop>
          <LinksLabel reg={reg} style={{ paddingRight: '4px' }}>
            <input
              type="radio"
              name="links"
              style={{ display: 'none' }}
              onChange={(e) => setReg(!e.target.checked)}
              value="log"
            />
            Войти
          </LinksLabel>
          /
          <LinksLabel style={{ paddingLeft: '4px' }} reg={!reg}>
            <input
              type="radio"
              name="links"
              style={{ display: 'none' }}
              value="reg"
              onChange={(e) => setReg(e.target.checked)}
            />
            Регистрация
          </LinksLabel>
          <CloseBtn
            type="button"
            onClick={() => dispatch(togglePopUp())}
          >
            <CloseIcon icon={close} size={20} />
          </CloseBtn>
        </FormBoxTop>
        {reg ? <SignIn /> : <LogIn />}
      </FormBox>
    </PopUpWrapper>
  );
};

export default PopUp;
