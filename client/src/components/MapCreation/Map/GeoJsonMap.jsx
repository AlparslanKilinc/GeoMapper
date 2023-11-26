import React, { useEffect } from 'react';
import { MapContainer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';

const GeoJsonMap = ({ styled }) => {
  const position = [37.8, -96.9]; // Approximate geographic center of the contiguous US

  return (
    <MapContainer center={position} zoom={4} style={{ flexGrow: 1, backgroundColor: 'white' }}>
      <GeojsonWrapper isStyled={styled} />
    </MapContainer>
  );
};

export default GeoJsonMap;
