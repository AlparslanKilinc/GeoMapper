import React from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';

const GeoJsonMap = ({ styled }) => {
  const { mapBackgroundColor, isTilelayerVisible } = useSelector((state) => state.mapStyles);

  return (
    <MapContainer style={{ flexGrow: 1, backgroundColor: mapBackgroundColor }}>
      {isTilelayerVisible && <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />}
      <GeojsonWrapper isStyled={styled} />
    </MapContainer>
  );
};

export default GeoJsonMap;
