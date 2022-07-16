import React from 'react';
import Page from '../components/Page';
import Container from '../components/Container';
import styled from 'styled-components';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';

const StyledPage = styled(Page)``;

const StyledData = styled.div`
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

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input<{ valid?: boolean }>`
  width: 100%;
  font-size: 14px;
  background: none;
  outline: none;
  border: 1px solid #ffffff;
  padding: 20px 25px;
  color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  position: absolute;
  background-color: #1e2225;
  font-weight: 600;
  font-size: 12px;
  top: 0;
  transform: translateY(-50%);
  padding: 0 5px;
  left: 15px;
`;

const Footer = styled.footer`
  border-top: 1px solid #ffffff;
  padding-top: 10px;
`;

interface IDataForm {
  number: string;
  il: string;
  applicant: string;
  address_applicant: string;
}

const Data = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IDataForm>({
    mode: 'onBlur',
  });

  return (
    <StyledPage>
      <StyledData>
        <Container>
          <Heading>Данные</Heading>
          <Wrapper>
            <Col>
              <InputGroup>
                <Label>№ продукции</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>ИЛ</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>Заявитель</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>Адрес заявителя</Label>
                <Input />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Label>Страна</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>Изготовитель</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>Адрес изготовителя</Label>
                <Input />
              </InputGroup>
              <InputGroup>
                <Label>Группа продукции *</Label>
                <Input readOnly />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <Label>Технический регламент *</Label>
                <Input readOnly />
              </InputGroup>
              <InputGroup>
                <Label>Код ТН ВЭД ЕАЭС *</Label>
                <Input readOnly />
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
