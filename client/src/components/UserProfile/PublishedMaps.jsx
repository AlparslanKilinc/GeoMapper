import React from 'react';
import MapCard from '../MapCard';
export default function PublishedMaps({theme}) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MapCard showActions={true} theme = {theme}/>
      <MapCard showActions={true} theme = {theme}/>
      <MapCard showActions={true} theme = {theme}/>
    </div>
  );
}