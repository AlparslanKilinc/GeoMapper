import React from 'react';
import MapCard from '../MapCard';
export default function Bookmarks({theme}) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MapCard showActions={true} theme = {theme}/>
      <MapCard showActions={true} theme = {theme} />
      <MapCard showActions={true} theme = {theme}/>
    </div>
  );
}
