import React, { useState } from 'react';
import Page from '../components/Page';
import Container from '../components/Container';
import styled from 'styled-components';
import Button from '../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

const StyledPage = styled(Page)``;

const StyledData = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  width: 30%;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const Input = styled.input<{ valid?: boolean; disabled?: boolean }>`
  width: 100%;
  background: none;
  outline: none;
  border: 1px solid ${(props) => (!props.valid ? '#ffffff' : 'red')};
  padding: 15px 20px;
  color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'cursor')};
`;

export const Label = styled.label`
  position: absolute;
  background-color: #1e2225;
  font-weight: 600;
  font-size: 12px;
  top: 0;
  transform: translateY(-50%);
  padding: 0 5px;
  left: 15px;
  z-index: 3;
`;

const Footer = styled.footer`
  border-top: 1px solid #ffffff;
  padding-top: 10px;
`;

interface IData {
  number: string;
  il: string;
  applicant: string;
  addressApplicant: string;
  country: string;
  manufacturer: string;
  addressManufacturer: string;
  productGroup: string;
  technicalRegulation: string;
  code: string;
}

interface IDataProps {
  token: string | null;
}

const Data: React.FC<IDataProps> = (props) => {
  const [isFirstStep, setIsFirstStep] = useState(true);
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IData> = async (data) => {
    if (isFirstStep) {
      const formData = new FormData();
      formData.append('', data.number);
      formData.append('', data.number);
      formData.append('', data.number);
      formData.append('', data.number);
      formData.append('', data.number);
      formData.append('', data.number);
      formData.append('', data.number);
      //to back
      const response = fetch('', {
        method: 'POST',
        body: formData,
      });
      //from back
      setValue('productGroup', 'fromBack');
      setValue('technicalRegulation', 'fromBack');
      setValue('code', 'fromBack');
      setIsFirstStep(false);
      return;
    }

    const response = fetch('', {
      method: 'POST',
      body: '',
    });
  };
  return (
    <StyledPage>
      {!props.token ? <Navigate to={'/'} /> : ''}
      <StyledData onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Heading>Данные</Heading>
          <Wrapper>
            <Col>
              <InputGroup>
                <Label>№ продукции</Label>
                <Input
                  {...register('number', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.number?.message}
                />
              </InputGroup>
              <InputGroup>
                <Label>ИЛ</Label>
                <Input
                  {...register('il', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.il?.message}
                />
              </InputGroup>
              <InputGroup>
                <Label>Заявитель</Label>
                <Input
                  {...register('applicant', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.applicant?.message}
                />
              </InputGroup>
              <InputGroup>
                <Label>Адрес заявителя</Label>
                <Input
                  {...register('addressApplicant', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.addressApplicant?.message}
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Label>Страна</Label>
                <Input
                  {...register('country', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.country?.message}
                />
              </InputGroup>
              <InputGroup>
                <Label>Изготовитель</Label>
                <Input
                  {...register('manufacturer', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.manufacturer?.message}
                />
              </InputGroup>
              <InputGroup>
                <Label>Адрес изготовителя</Label>
                <Input
                  {...register('addressManufacturer', {
                    required: 'Поле обязательно к заполнению',
                  })}
                  valid={!!errors.addressManufacturer?.message}
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Label>Группа продукции *</Label>
                <Input {...register('productGroup')} disabled={isFirstStep} />
              </InputGroup>
              <InputGroup>
                <Label>Технический регламент *</Label>
                <Input
                  {...register('technicalRegulation')}
                  disabled={isFirstStep}
                />
              </InputGroup>
              <InputGroup>
                <Label>Код ТН ВЭД ЕАЭС *</Label>
                <Input {...register('code')} disabled={isFirstStep} />
              </InputGroup>
            </Col>
          </Wrapper>
          <Button>Отправить</Button>
        </Container>
        <Footer>
          <Container>*Данные заполняются автоматически</Container>
        </Footer>
      </StyledData>
    </StyledPage>
  );
};

export default Data;
