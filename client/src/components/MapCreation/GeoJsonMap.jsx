import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GeoJsonMap = ({ geoJsonData }) => {
  const position = [37.8, -96.9]; // Approximate geographic center of the contiguous US
  const zoomLevel = 4;

  const styles = { color: 'black', weight: 1 };

  return (
    <MapContainer center={position} zoom={4} style={{ height: '100%', width: '100%' }}>
      {geoJsonData && <GeoJSON data={geoJsonData} style={styles} />}
    </MapContainer>
  );
};

export default GeoJsonMap;
