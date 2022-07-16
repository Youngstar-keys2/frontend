import React from 'react';
import { Clusterer, YMaps, Map as YMap } from '@pbe/react-yandex-maps';
import styled from 'styled-components';
import MapPlacemark from './MapPlacemark';

const StyledMap = styled.div`
  canvas {
    filter: invert(100%) hue-rotate(200deg);
  }
`;

const Map: React.FC = () => {
  return (
    <StyledMap>
      <YMaps>
        <YMap
          defaultState={{
            center: [60.548229, 91.116157],
            zoom: 3,
          }}
          width={'100vw'}
          height={'100vh'}
          modules={['control.ZoomControl']}
        >
          <Clusterer
            options={{
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
            }}
          >
            <MapPlacemark
              name={'Placemark'}
              defaultGeometry={[55.751574, 37.673856]}
              balloonContentHeader={'Header'}
              balloonContentBody={'Body'}
              balloonContentFooter={'Footer'}
            />
            <MapPlacemark
              name={'Placemark'}
              defaultGeometry={[55.751574, 37.673856]}
              balloonContentHeader={'Header'}
              balloonContentBody={'Body'}
              balloonContentFooter={'Footer'}
            />
            <MapPlacemark
              name={'Placemark'}
              defaultGeometry={[56.751574, 37.573856]}
              balloonContentHeader={'Header'}
              balloonContentBody={'Body'}
              balloonContentFooter={'Footer'}
            />
            <MapPlacemark
              name={'Placemark'}
              defaultGeometry={[56.751574, 37.673856]}
              balloonContentHeader={'Header'}
              balloonContentBody={'Body'}
              balloonContentFooter={'Footer'}
            />
          </Clusterer>
        </YMap>
      </YMaps>
    </StyledMap>
  );
};

export default Map;
