import React from 'react';
import MapCard from '../MapCard';
export default function Drafts() {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MapCard showActions={false} />
      <MapCard showActions={false} />
      <MapCard showActions={false} />
    </div>
  );
}
