import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { BaseGeoObjectProps } from '@pbe/react-yandex-maps/typings/geo-objects/BaseGeoObject';

import PlacemarkSvg from '../assets/svg/placemark.svg';

interface IMapPlacemarkProps extends BaseGeoObjectProps {
  defaultGeometry: Array<number>;
  balloonContentHeader: string;
  balloonContentBody: string;
  balloonContentFooter: string;
}

const MapPlacemark: React.FC<IMapPlacemarkProps> = (props) => {
  return (
    <Placemark
      defaultGeometry={props.defaultGeometry}
      properties={{
        balloonContentHeader: props.balloonContentHeader,
        balloonContentBody: props.balloonContentBody,
        balloonContentFooter: props.balloonContentFooter,
      }}
      options={{
        hasBalloon: true,
        hideIconOnBalloonOpen: false,
        balloonOffset: [4, -40],
        preset: 'islands#grayCircleDotIcon',
        iconLayout: 'default#image',
        iconImageHref: PlacemarkSvg,
      }}
      modules={['geoObject.addon.balloon']}
    />
  );
};

export default MapPlacemark;
