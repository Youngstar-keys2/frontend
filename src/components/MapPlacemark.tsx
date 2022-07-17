import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';

interface IMapPlacemarkProps {
  coords: Array<number>;
  name: string;
}

const MapPlacemark: React.FC<IMapPlacemarkProps> = (props) => {
  return (
    <Placemark
      defaultGeometry={props.coords}
      properties={{
        balloonContentHeader: props.name,
        balloonContentFooter: `<a href=/company/${props.name
          .split(' ')
          .join('-')}>Подробнее</a>`,
      }}
      options={{
        hasBalloon: true,
        hideIconOnBalloonOpen: false,
        balloonOffset: [-2, -5],
        preset: 'islands#grayCircleDotIcon',
      }}
      modules={['geoObject.addon.balloon']}
    />
  );
};

export default MapPlacemark;
