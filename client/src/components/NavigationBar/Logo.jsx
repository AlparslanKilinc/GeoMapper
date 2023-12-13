import React from 'react';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useClearStates } from '../MapCreation/useClearStates';

export default function Logo({openConfirmationModal, setPath}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearStatesComplete } = useClearStates();

  const handleLogoClick = () => {
    if (location.pathname == '/mapCreation/OutlineSelection' || location.pathname == '/mapCreation/DataEditor') {
      openConfirmationModal();
      setPath('/');
    } else if( location.pathname == '/mapCreation/GraphicsEditor' ){
      clearStatesComplete();
      navigate('/');
    }
    else {
      navigate('/');
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
