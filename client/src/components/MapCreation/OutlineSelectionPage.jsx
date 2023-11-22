import React, { useState } from 'react';
import '../../styles/outlineSelectionPage.css';
import { useSelector } from 'react-redux';
import { List, ListItemButton, ListItemText, Divider, TextField } from '@mui/material';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import GeoJsonMap from './GeoJsonMap';
import { useDispatch } from 'react-redux';
import { fetchGeojson, fetchGeojsonById } from '../../redux-slices/geoJSONSlice';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceIcon from '@mui/icons-material/Place';
import OutlineFileUploader from './OutlineFileUploader';

export default function OutlineSelectionPage() {
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const dispatch = useDispatch();

  const { items, geojson, isLoadingItems, isLoadingGeojson } = useSelector(
    (state) => state.geojson
  );

  useEffect(() => {
    dispatch(fetchGeojson());
  }, []);

  // Handler for clicking an item
  const handleItemClick = (item) => {
    dispatch(fetchGeojsonById(item._id));
  };

  return (
    <div id="outline-page">
      <div id="outline-page-left">
        <div className="header-primary">
          <h2>{mapGraphicsType}</h2>
          <Divider style={{ width: '50%' }} />
        </div>

        <h3 className="secondary-title">select map</h3>
        <OutlineFileUploader />
        <TextField
          variant="outlined"
          helperText="What type of map do you want to create?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon /> search for places
              </InputAdornment>
            )
          }}
        />

        {isLoadingItems ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <List sx={{ width: '100%' }}>
            {items.map((item, index) => (
              <React.Fragment key={item._id}>
                <ListItemButton onClick={() => handleItemClick(item)} sx={{ width: '100%' }}>
                  <ListItemText primary={item.name} sx={{ textAlign: 'center' }} />
                </ListItemButton>
                {index !== items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </div>
      <div id="outline-page-right">
        {/* <h2>Map Preview</h2> */}
        {isLoadingGeojson ? (
          <CircularProgress />
        ) : (
          <div style={{ height: '100%', width: '100%', display: 'flex' }}>
            {geojson && <GeoJsonMap geoJsonData={geojson.geoJSON} styled={false} />}
          </div>
        )}
      </div>
    </div>
  );
}
