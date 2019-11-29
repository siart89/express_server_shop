import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Div,
  Label,
  Input,
  FormTitle,
  FormBtn,
} from './styles/styles';
import regIn from '../../store/actions/regIn';

const SignIn = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [checkPass, setCheckPass] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setMessage('');
  }, [password, setMessage]);


  const handleRegOnSubmit = async (e) => {
    e.preventDefault();
    if (password === checkPass) {
      const user = {
        name,
        mail,
        phone,
        password,
      };

      const resp = await fetch('/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charser=utf-8',
        },
        body: JSON.stringify(user),
      });
      const result = await resp.json();
      if (result.message) {
        setMessage(result.message);
        if (result.token) {
          dispatch(regIn(result.token));
        }
      } else {
        setMessage('Сбой, повторите попытку');
      }
    } else {
      setMessage('Пароль не соответствует');
      setCheckPass('');
    }
  };

  return (
    <>
      <FormTitle>
        Зарегистрировать аккаунт на сайте:
      </FormTitle>
      {message && <FormTitle>{message}</FormTitle>}
      <Form onSubmit={handleRegOnSubmit}>
        <Div>
          <Label>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Имя"
              required
            />
          </Label>
        </Div>
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
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              required
              placeholder="Телефон"
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
        <Div>
          <Label>
            <Input
              type="password"
              onChange={(e) => setCheckPass(e.target.value)}
              value={checkPass}
              required
              placeholder="Подтверждение пароля"
            />
          </Label>
        </Div>
        <FormBtn>
          Зарегистрироваться
        </FormBtn>
      </Form>
    </>
  );
};

export default SignIn;
