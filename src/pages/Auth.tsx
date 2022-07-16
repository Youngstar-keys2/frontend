import React from 'react';
import styled from 'styled-components';

import Page from '../components/Page';
import { Link, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

const StyledInput = styled.input<{ error?: boolean }>`
  background: none;
  border: none;
  border-bottom: ${(props) =>
    props.error ? '1px solid red' : '1px solid white'};
  outline: none;

  font-family: 'Manrope', sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: #ffffff;
  width: 60%;
  padding: 7px 0;

  margin-bottom: 25px;
  &::placeholder {
    font-weight: 300;
    color: #8d8d8d;
    font-size: 17px;
  }
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'Manrope', sans-serif;
  font-size: 30px;
  font-weight: 700;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Tip = styled.div`
  margin-bottom: 45px;
`;

interface ILogin {
  username: string;
  password: string;
}

interface IAuthProps {
  token: string | null;
  setToken: (token: string) => void;
}

const Auth: React.FC<IAuthProps> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    mode: 'onBlur',
  });

  if (props.token) {
    return <Navigate to={'/'} replace />;
  }

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    const response = await fetch('http://92.63.102.121:8081/login', {
      method: 'POST',
      body: formData,
    });
    const token = await response.json();
    if (response.ok) {
      localStorage.setItem('token', token.access_token);
      props.setToken(token.access_token);
    }
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Вход в систему</Title>
        <Content>
          <StyledInput
            placeholder={'Логин'}
            {...register('username', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.username?.message}
          />
          <StyledInput
            placeholder={'Пароль'}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
            })}
            type={'password'}
            error={!!errors.password?.message}
          />
        </Content>
        <Footer>
          <Tip>
            У вас нет аккаунта? <Link to={'/registration'}>Регистрация</Link>
          </Tip>
          <Button>Войти</Button>
        </Footer>
      </Form>
    </Page>
  );
};

export default Auth;
