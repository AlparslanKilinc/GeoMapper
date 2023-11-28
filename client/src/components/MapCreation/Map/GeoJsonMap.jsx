import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';
import SymbolLayer from '../MapGraphicsEditor/StylesMenu/Shapes/SymbolLayer';

const GeoJsonMap = ({ styled }) => {
  const mapBackgroundColor = useSelector((state) => state.mapStyles.mapBackgroundColor);
  const isTilelayerVisible = useSelector((state) => state.mapStyles.isTilelayerVisible);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const renderSymbolLayer = mapGraphicsType === 'Symbol Map' && styled;

  return (
    <MapContainer
      style={{
        flexGrow: 1,
        backgroundColor: styled ? mapBackgroundColor : 'white'
      }}
    >
      {isTilelayerVisible && (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      )}
      <GeojsonWrapper isStyled={styled} />
      {renderSymbolLayer && <SymbolLayer />}
    </MapContainer>
  );
};

export default GeoJsonMap;
