import React from 'react';
import MapCard from '../MapCard';
export default function Drafts({theme}) {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <MapCard showActions={false} theme = {theme}/>
            <MapCard showActions={false} theme = {theme}/>
            <MapCard showActions={false} theme = {theme}/>
        </div>
    );
}