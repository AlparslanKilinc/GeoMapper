import React, { useRef } from 'react';
import '../styles/landingPage.css';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import heatMap from '../assets/heat_map.jpeg';
import spikeMap from '../assets/spike_map.png';
import symbolMap from '../assets/symbol_map.png';
import choroplethMap from '../assets/choropleth_map.png';
import dotDensityMap from '../assets/dot_density_map.png';
import { Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CopyRight from './CopyRight';

export default function LandingPage() {
  const scrollContainer = useRef(null);
  const mapData = [
    {
      imgSrc: choroplethMap,
      alt: 'Choropleth Map',
      title: 'Choropleth Maps',
      description:
        'A choropleth map uses colors or patterns to show how a single data variable varies across a region. For example, a choropleth map could vividly illustrate which states in the U.S. have the highest unemployment rates, with darker shades indicating higher percentages.'
    },
    {
      imgSrc: symbolMap,
      alt: 'Symbol Map',
      title: 'Symbol Maps',
      description:
        'A shape map displays data on a map using varying shapes, like circles. For example, a city planner could represent parks with circles, where size indicates park area and color shows visitor count, providing a quick overview of park distribution and popularity.'
    },
    {
      imgSrc: dotDensityMap,
      alt: 'Dot Density Map',
      title: 'Dot Density Maps',
      description:
        'A dot density map uses dots to represent data values in specific areas, with each dot signifying a set quantity. For example, on a map showing population, one dot might represent 1,000 people, allowing for a visual grasp of population distribution across regions.'
    },
    {
      imgSrc: heatMap,
      alt: 'Heat Map',
      title: 'Heat Maps',
      description:
        'A heat map employs gradients of color to indicate the intensity or concentration of a specific data variable in a given area. For example, a heat map might effectively showcase the areas of a city with the most signifying heavier traffic flow.'
    },
    {
      imgSrc: spikeMap,
      alt: 'Spike Map',
      title: 'Spike Maps',
      description:
        "A spike map displays data using vertical lines or 'spikes' protruding from specific locations on a map. The height of each spike corresponds to the data's magnitude. For instance, in a map showing annual rainfall, taller spikes could represent regions with more precipitation, offering a clear visual of rainfall distribution."
    }
  ];

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollLeft += scrollOffset;
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
        <img className="image" src={GeoMapperImage} alt="explore guy" />
      </div>

      <Divider className="divider">Choose from diverse templates and start mapping!</Divider>
      <div className="maps-container">
        <Button onClick={() => scroll(-400)}>&lt;</Button>
        <div className="maps" ref={scrollContainer}>
          {mapData.map((map, index) => (
            <div key={index} className="outer-box">
              <img className="image" src={map.imgSrc} alt={map.alt} />
              <div className="info-box">
                <h2>{map.title}</h2>
                <p>{map.description}</p>
                <Link className="link" to={'/mapCreation'}>
                  <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
                    Create
                  </Button>
                </Link>
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
