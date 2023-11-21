import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const GeoJsonMap = ({ geoJsonData, styled, onEachFeature }) => {
  const position = [37.8, -96.9]; // Approximate geographic center of the contiguous US
  const styles = { color: 'black', weight: 1 };

  if (styled) {
    const { borderColor, borderWidth } = useSelector((state) => state.mapStyles);
    styles.color = borderColor;
    styles.weight = borderWidth;
    styles.fillOpacity = 1;
  }

  return (
    <MapContainer center={position} zoom={4} style={{ flexGrow: 1 }}>
      {geoJsonData && <GeoJSON data={geoJsonData} style={styles} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
};

export default GeoJsonMap;
