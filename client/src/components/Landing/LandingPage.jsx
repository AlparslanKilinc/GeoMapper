import React, { useRef } from 'react';
import '../../styles/landingPage.css';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import mapDataJson from '../../mapData.json';
import { Divider, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CopyRight from '../Landing/CopyRight';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMapGraphicsType } from '../../redux-slices/mapMetadataSlice';
import { MediaCard } from '../MapCreation/TemplateSelection';

export default function LandingPage() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const mapData = mapDataJson.mapData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateClick = (mapTitle) => {
    dispatch(setMapGraphicsType(mapTitle));
    navigate('/mapCreation/OutlineSelection');
  };

  return (
    <div className="landing-page">
      <div className="intro-box">
        <div className="intro-info-box">
          <h1> Welcome to GeoMapper </h1>
          <p>
            GeoMapper offers map visualization combined with a community focus. Dive into GeoMapper
            and discover a balanced approach to engaging with geographic data, harmonizing
            technology, and community.
          </p>
          <div className="button-group">
            <Link className="link" to={'/explore'}>
              <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="explore">
                Explore
              </Button>
            </Link>
            {!loggedIn ? (<Link className="link" to={'/register'}>
              <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
                Register
              </Button>
            </Link>) : null}
          </div>
        </div>
        <img className="image" src={GeoMapperImage} alt="logo" />
      </div>

      <Divider className="divider">Choose from diverse templates and start mapping!</Divider>
      <Box display="flex" flexWrap="wrap" alignContent="center" justifyContent="center" gap={2}>
        {' '}
        {mapData.map((map, index) => (
          <MediaCard
            key={index}
            map={map}
            onClick={() => handleCreateClick(map.title)}
            className="outer-box"
          />
        ))}
      </Box>

      <CopyRight />
    </div>
  );
}
