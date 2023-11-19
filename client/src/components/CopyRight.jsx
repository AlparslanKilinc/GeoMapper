import React from 'react';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';

export default function CopyRight() {
  const footerStyle = {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#333', 
    paddingTop: '10px',
    fontSize: '16px',
    borderTop: '1px solid #ddd' ,
    width: '100%'
  };

  const imageStyle = {
    marginRight: '10px'
  };

  return (
    <div style={footerStyle} className = "footer">
      <img src={GeoMapperImage} alt="GeoMapper Logo" width="40" height="40" style={imageStyle} />
      &copy; 2024 GeoMapper
    </div>
  );
}