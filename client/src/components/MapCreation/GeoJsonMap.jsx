import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const GeoJsonMap = ({ geoJsonData, styled }) => {
  const position = [37.8, -96.9]; // Approximate geographic center of the contiguous US
  const zoomLevel = 4;

  const styles = { color: 'black', weight: 1 };

  if (styled) {
    const { borderColor, borderWidth } = useSelector((state) => state.mapStyles);
    styles.color = borderColor;
    styles.weight = borderWidth;
  }

  return (
    <MapContainer center={position} zoom={4} style={{ flexGrow: 1 }}>
      {geoJsonData && <GeoJSON data={geoJsonData} style={styles} />}
    </MapContainer>
  );
};

export default GeoJsonMap;
