import React from 'react';
import { MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import GeojsonWrapper from './MapGraphicsEditor/GeojsonWrapper';

const GeoJsonMap = ({ styled }) => {
  const position = [37.8, -96.9]; // Approximate geographic center of the contiguous US
  const styles = { color: 'black', weight: 1 };

  if (styled) {
    const { borderColor, borderWidth, opacity } = useSelector((state) => state.mapStyles);
    styles.color = borderColor;
    styles.weight = borderWidth;
    styles.fillOpacity = opacity;
  }

  return (
    <MapContainer center={position} zoom={4} style={{ flexGrow: 1 }}>
      <GeojsonWrapper styles={styles} isStyled={styled} />
    </MapContainer>
  );
};

export default GeoJsonMap;
