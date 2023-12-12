import React from 'react';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Logo({ setPath, openConfirmationModal }) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      openConfirmationModal();
      if (loggedIn) {
        setPath('/profile');
      } else {
        setPath('/');
      }
    } else {
      if (loggedIn) {
        navigate('/profile');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
      </div>
      <span style={{ fontSize: '18px' }}>GeoMapper</span>
    </div>
  );
}
