import React, { useRef } from 'react';
import '../../styles/landingPage.css';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import heatMap from '../../assets/heat_map.jpeg';
import spikeMap from '../../assets/spike_map.png';
import symbolMap from '../../assets/symbol_map.png';
import choroplethMap from '../../assets/choropleth_map.png';
import dotDensityMap from '../../assets/dot_density_map.png';
import mapDataJson from '../../mapData.json';
import { Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CopyRight from '../Landing/CopyRight';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMapGraphicsType } from '../../redux-slices/mapMetadataSlice';

export default function LandingPage() {
  const scrollContainer = useRef(null);
  const mapData = mapDataJson.mapData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollLeft += scrollOffset;
  };

  const getImageSrc = (title) => {
    switch (title) {
      case 'Heat Map':
        return heatMap;
      case 'Spike Map':
        return spikeMap;
      case 'Symbol Map':
        return symbolMap;
      case 'Choropleth Map':
        return choroplethMap;
      case 'Dot Density Map':
        return dotDensityMap;
      default:
        return null;
    }
  };

  const handleCreateClick = (mapTitle) => {
    dispatch(setMapGraphicsType(mapTitle));
    navigate('/mapCreation', { state: { stage: 1 } });
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
            <Link className="link" to={'/register'}>
              <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
                Register
              </Button>
            </Link>
          </div>
        </div>
        <img className="image" src={GeoMapperImage} alt="logo" />
      </div>

      <Divider className="divider">Choose from diverse templates and start mapping!</Divider>
      <div className="maps-container">
        <Button onClick={() => scroll(-400)}>&lt;</Button>
        <div className="maps" ref={scrollContainer}>
          {mapData.map((map, index) => (
            <div key={index} className="outer-box">
              <img className="image" src={getImageSrc(map.title)} alt={map.alt} />
              <Divider />
              <div className="info-box">
                <h2>{map.title}</h2>
                <p>{map.description}</p>
                <Button
                  onClick={() => handleCreateClick(map.title)}
                  style={{ backgroundColor: '#40E0D0' }}
                  variant="contained"
                  id="register"
                >
                  Create
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={() => scroll(400)}>&gt;</Button>
      </div>

      <CopyRight />
    </div>
  );
}
