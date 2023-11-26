import React from 'react';
import { MapContainer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';

const GeoJsonMap = ({ styled }) => {
  return (
    <MapContainer style={{ flexGrow: 1, backgroundColor: 'white' }}>
      <GeojsonWrapper isStyled={styled} />
    </MapContainer>
  );
};

export default GeoJsonMap;
