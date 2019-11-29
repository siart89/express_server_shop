import React, { useState } from 'react';
import {
  Form,
  Div,
  Label,
  Input,
  FormTitle,
  FormBtn,
} from './styles/styles';

const LogIn = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message] = useState('');

  return (
    <>
      <FormTitle>
        Войти
      </FormTitle>
      {message && <FormTitle>{message}</FormTitle>}
      <Form>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              required
              placeholder="Электронная почта"
            />
          </Label>
        </Div>
        <Div>
          <Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Пароль"
            />
          </Label>
        </Div>
        <FormBtn>
          Войти
        </FormBtn>
      </Form>
    </>
  );
};

export default LogIn;
