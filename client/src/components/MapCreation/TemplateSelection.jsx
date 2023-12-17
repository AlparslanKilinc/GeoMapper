import React from 'react';
import '../../styles/templateSelection.css';
import heatMap from '../../assets/heat_map.png';
import spikeMap from '../../assets/spike_map.png';
import symbolMap from '../../assets/symbol_map.png';
import choroplethMap from '../../assets/choropleth_map.png';
import dotDensityMap from '../../assets/dot_density_map.png';
import {
  Divider,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';
import mapDataJson from '../../mapData.json';
import CopyRight from '../Landing/CopyRight';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMapGraphicsType } from '../../redux-slices/mapMetadataSlice';

export function MediaCard({ map, onClick }) {
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
  const { title, description } = map;
  return (
    <Card elevation={3} sx={{ maxWidth: 390 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia sx={{ height: 200 }} image={getImageSrc(title)} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Create {map.title}</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default function TemplateSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapData = mapDataJson.mapData;

  const handleSelection = (title) => {
    dispatch(setMapGraphicsType(title));
    navigate('/mapCreation/OutlineSelection');
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

      <Box display="flex" flexWrap="wrap" alignContent="center" justifyContent="center" gap={2}>
        {mapData.map((map, index) => (
          <MediaCard
            key={index}
            map={map}
            onClick={() => {
              handleSelection(map.title);
            }}
          />
        ))}
      </Box>
      <CopyRight />
    </div>
  );
}
