import React from 'react';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import DarkModeLogo from '../assets/DarkModeLogo.svg';

export default function CopyRight({theme}) {
  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'theme.typography.allVariants.color',
    paddingTop: '10px',
    fontSize: '16px',
    borderTop: '1px solid #ddd',
    width: '100vw'
  };

  const imageStyle = {
    marginRight: '10px'
  };
  return (
      <div style={footerStyle} className="footer">
        <img src={theme.themeName === 'dark' ? DarkModeLogo : GeoMapperImage} alt="GeoMapper Logo" width="40"
             height="40" style={imageStyle}/>
        &copy; 2024 GeoMapper
      </div>
  );
}