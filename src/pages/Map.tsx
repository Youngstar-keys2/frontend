import React, { useState } from 'react';
import { Clusterer, YMaps, Map as YMap } from '@pbe/react-yandex-maps';
import styled from 'styled-components';
import MapPlacemark from '../components/MapPlacemark';
import Container from '../components/Container';
import { Input, InputGroup, Label } from './Data';
import Button from '../components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';

const StyledMap = styled.div`
  height: 100%;
  display: flex;
  canvas {
    filter: invert(100%) hue-rotate(200deg);
  }
`;

const Sidebar = styled.form`
  width: 33%;
  display: flex;
  padding: 15px 20px;
  flex-direction: column;
  margin-right: 5%;
  box-shadow: 3px 3px 4px rgba(255, 251, 251, 0.07), -3px -3px 4px #19191e;
  border-radius: 10px;
  hr {
    width: 100%;
    margin-bottom: 20px;
  }
  button {
    padding: 10px 0;
  }
`;

const SidebarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SidebarHeader = styled.h2`
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const Select = styled.select`
  width: 100%;
  appearance: none;
  background: none;
  padding: 15px 20px;
  color: #ffffff;
  outline: none;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;
const Option = styled.option`
  background-color: #1e2225;
`;

const StyledButton = styled(Button)`
  padding-top: 10px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 4px 4px 5px rgba(255, 251, 251, 0.07), -3px -3px 4px #19191e;
  border-radius: 10px;
  a {
    color: #1e2225;
    text-decoration: underline;
  }
`;

interface IMapProps {
  token: string | null;
}

interface IMapData {
  code: string;
}

const Map: React.FC<IMapProps> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IMapData>({
    mode: 'onBlur',
  });

  const [markers, setMarkers] = useState<Array<any>>([]);

  //2523100000 test

  const onSubmit: SubmitHandler<IMapData> = async (data) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://92.63.102.121:8081/search?list=${data.code}&page=1`
      );
      const json = await response.json();
      const dots: any = [];
      json?.tags.forEach((tag: any) => {
        tag.izgot.forEach((izgot: any, index: number) => {
          dots.push({
            x: tag.latitude,
            y: tag.longtitude + (index + 1) * 0.0001,
            name: izgot.name_sub,
          });
        });
      });
      setMarkers(dots);
    };
    fetchData();
  };

  return (
    <Container>
      <StyledMap>
        <Sidebar onSubmit={handleSubmit(onSubmit)}>
          <SidebarHeader>Фильтры</SidebarHeader>
          <hr />
          <SidebarWrapper>
            <InputGroup>
              <Label>Код ТН ВЭД</Label>
              <Input
                {...register('code', {
                  required: 'Поле обязательно к заполнению',
                })}
                valid={!!errors.code?.message}
              />
            </InputGroup>
            <InputGroup>
              <Label>Товарная группа</Label>
              <Input />
            </InputGroup>
            <InputGroup>
              <Label>Технический регламент</Label>
              <Input />
            </InputGroup>
            <InputGroup>
              <Label>Заявитель</Label>
              <Input />
            </InputGroup>
            <InputGroup>
              <Label>Изготовитель</Label>
              <Input />
            </InputGroup>
            <InputGroup>
              <Label>Страна</Label>
              <Input />
            </InputGroup>
            <StyledButton>Применить</StyledButton>
          </SidebarWrapper>
        </Sidebar>
        <YMaps query={{ apikey: '28bd532b-5f00-463e-a9c9-31709079523d' }}>
          <MapWrapper>
            <YMap
              defaultState={{
                center: [60.548229, 91.116157],
                zoom: 3,
              }}
              width={'100%'}
              height={'100%'}
              modules={['control.ZoomControl']}
            >
              <Clusterer
                options={{
                  preset: 'islands#blackClusterIcons',
                  groupByCoordinates: false,
                  gridSize: 32,
                  clusterBalloonContentLayout: 'cluster#balloonAccordion',
                  openBalloonOnClick: true,
                }}
              >
                {markers.map((marker, index) => (
                  <MapPlacemark
                    key={index}
                    coords={[marker.x, marker.y]}
                    name={marker.name}
                  />
                ))}
              </Clusterer>
            </YMap>
          </MapWrapper>
        </YMaps>
      </StyledMap>
    </Container>
  );
};

export default Map;
