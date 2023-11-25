import React from 'react';
import MapCard from '../../Explore/MapCard';

export default function PublishedMaps() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MapCard showActions={true} />
      <MapCard showActions={true} />
      <MapCard showActions={true} />
    </div>
  );
}
