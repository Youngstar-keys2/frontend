import React from 'react';
import styled from 'styled-components';
import Page from '../components/Page';
import { Content, Footer, Form, Tip, Title } from './Auth';
import Button from '../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

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

const Error = styled.div`
  font-size: 12px;
  color: red;
`;

interface IRegistration {
  il: string;
  applicant: string;
  country: string;
  addres_applicant: string;
  username: string;
  password: string;
}

interface IRegistrationProps {
  token: string | null;
  setToken: (token: string) => void;
}

const Registration: React.FC<IRegistrationProps> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IRegistration>({
    mode: 'onBlur',
  });

  if (props.token) {
    return <Navigate to={'/'} replace />;
  }

  const onSubmit: SubmitHandler<IRegistration> = async (data) => {
    const formData = new FormData();
    formData.append('il', data.il);
    formData.append('applicant', data.applicant);
    formData.append('addres_applicant', data.addres_applicant);
    formData.append('country', data.country);
    formData.append('username', data.username);
    formData.append('password', data.password);
    const response = await fetch('http://92.63.102.121:8081/registration', {
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
        <Title>Регистрация</Title>
        <Content>
          <StyledInput
            placeholder={'Ил'}
            {...register('il', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.il?.message}
          />
          <Error>{errors.il?.message}</Error>
          <StyledInput
            placeholder={'Заявитель'}
            {...register('applicant', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.applicant?.message}
          />
          <Error>{errors.applicant?.message}</Error>
          <StyledInput
            placeholder={'Адрес заявителя'}
            {...register('addres_applicant', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.addres_applicant?.message}
          />
          <Error>{errors.addres_applicant?.message}</Error>
          <StyledInput
            placeholder={'Страна'}
            {...register('country', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.country?.message}
          />
          <Error>{errors.country?.message}</Error>
          <StyledInput
            placeholder={'Логин'}
            {...register('username', {
              required: 'Поле обязательно к заполнению',
            })}
            error={!!errors.username?.message}
          />
          <Error>{errors.username?.message}</Error>
          <StyledInput
            type={'password'}
            placeholder={'Придумайте пароль'}
            {...register('password', {
              minLength: {
                value: 6,
                message: 'Не менее 6 символов',
              },
              pattern: {
                value: /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]{6,}$/,
                message: 'Пароль должен содержать буквы и цифры',
              },
            })}
            error={!!errors.password?.message}
          />
          <Error>{errors.password?.message}</Error>
        </Content>
        <Footer>
          <Tip>
            У вас уже есть аккаунт? <Link to={'/auth'}>Авторизация</Link>
          </Tip>
          <Button>Зарегистрироваться</Button>
        </Footer>
      </Form>
    </Page>
  );
};

export default Registration;
