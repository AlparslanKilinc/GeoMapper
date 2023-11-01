import React from 'react';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Logo() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link className="link" to={loggedIn ? '/profile' : '/'}>
        <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
      </Link>
      <span style={{ fontSize: '18px' }}>GeoMapper</span>
    </div>
  );
}
