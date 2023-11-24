import React from 'react';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import DarkModeLogo from '../../assets/DarkModeLogo.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Logo({isDark}) {
    const loggedIn = useSelector((state) => state.auth.loggedIn);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link className="link" to={loggedIn ? '/profile' : '/'}>
                <img src={isDark ? DarkModeLogo : GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
            </Link>
            <span style={{ fontSize: '18px', color: isDark ? '#40E0D0' : '#006666'}}>GeoMapper</span>
        </div>
    );
}
