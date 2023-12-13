import React from 'react';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSaveMap } from '../MapCreation/useSaveMap';
import { useClearStates } from '../MapCreation/useClearStates';
import { useLocation } from 'react-router-dom';

export default function Logo({openConfirmationModal, setPath}) {
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const saveMapData = useSaveMap();
  const {clearStatesComplete}  = useClearStates();

  const handleLogoClick = () => {
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      if (loggedIn) {
        /// Save map data then clear states. save up to the stage you in or another solution
        // if saved before map graphics stage you will get container error
        // clearStatesComplete is a promise
        clearStatesComplete();
        navigate('/');
      } else {
        setPath('/');
        openConfirmationModal();
      }
    }else{
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
