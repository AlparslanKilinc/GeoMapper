import React, { useRef } from 'react';
import '../../styles/templateSelection.css';
import heatMap from '../../assets/heat_map.jpeg';
import spikeMap from '../../assets/spike_map.png';
import symbolMap from '../../assets/symbol_map.png';
import choroplethMap from '../../assets/choropleth_map.png';
import dotDensityMap from '../../assets/dot_density_map.png';
import { Divider, Button } from '@mui/material';
import mapDataJson from '../../mapData.json';
import CopyRight from '.././CopyRight';
import { useDispatch } from 'react-redux';
import { setMapGraphicsType } from '../../redux-slices/mapMetadataSlice';

export default function TemplateSelection({ onSelectionComplete }) {
  const dispatch = useDispatch();
  const mapData = mapDataJson.mapData;

  const handleSelection = (title) => {
    dispatch(setMapGraphicsType(title));
    onSelectionComplete();
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

  return (
    <div className="template-selection">
      <div className="template-intro">
        <h1>What type of map do you want to create ?</h1>
        <p>Choose the map type that fits your data</p>
      </div>

      <div className="container">
        <div className="selections">
          {mapData.map((map, index) => (
            <div key={index} className="outer-box">
              <img className="image" src={getImageSrc(map.title)} alt={map.alt} />
              <Divider />
              <div className="info-box">
                <h2>{map.title}</h2>
                <p>{map.description}</p>
                <Button
                  onClick={() => {
                    handleSelection(map.title);
                  }}
                  style={{ backgroundColor: '#40E0D0' }}
                  variant="contained"
                  id="register"
                >
                  Create a {map.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
