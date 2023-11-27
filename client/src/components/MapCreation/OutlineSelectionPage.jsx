import React, { useState, useEffect } from 'react';
import '../../styles/outlineSelectionPage.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import GeoJsonMap from './Map/GeoJsonMap';
import OutlineFileUploader from './OutlineFileUploader';
import { fetchGeojson, fetchGeojsonById, searchGeojson } from '../../redux-slices/geoJSONSlice';

export default function OutlineSelectionPage() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const { items, isLoadingItems, isLoadingGeojson } = useSelector((state) => state.geojson);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  useEffect(() => {
    dispatch(fetchGeojson());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchInput(query);

    if (query.length === 0) {
      dispatch(fetchGeojson());
    } else {
      dispatch(searchGeojson(query));
    }
  };

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

        <h3 className="secondary-title">Select Map</h3>
        <OutlineFileUploader />
        <TextField
          variant="outlined"
          value={searchInput}
          onChange={handleSearchChange}
          helperText="What type of map do you want to create?"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
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
        {isLoadingGeojson ? (
          <CircularProgress />
        ) : (
          <div style={{ height: '100%', width: '100%', display: 'flex' }}>
            <GeoJsonMap styled={false} />
          </div>
        )}
      </div>
    </div>
  );
}
