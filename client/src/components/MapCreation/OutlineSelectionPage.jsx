import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItemButton, ListItemText, Divider, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import '../../styles/outlineSelectionPage.css';
import CircularProgress from '@mui/material/CircularProgress';
import GeoJsonMap from './GeoJsonMap';
import { useDispatch } from 'react-redux';
import { fetchGeojson, fetchGeojsonById } from '../../redux-slices/geoJSONSlice';
import InputAdornment from '@mui/material/InputAdornment';
import PlaceIcon from '@mui/icons-material/Place';

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
    // Perform actions when an item is clicked
  };

  return (
    <div id="outline-page" className = "outline-selection-page">
      <div id="outline-page-left">
        <div className="header-primary">
          <h2>{mapGraphicsType}</h2>
          <Divider style={{ width: '50%' }} />
        </div>

        <h3 className="secondary-title">select map</h3>

        <LoadingButton
          startIcon={<CloudUploadIcon className = "outline-loading-button"/>}
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
          className = "outline-loading-button"
        >
          upload map
        </LoadingButton>

        <TextField
          variant="outlined"
          className = "outline-selection-texfield"
          style = {{marginRight: '10px'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className = "map-location-textfield"  >
                <PlaceIcon/> search for places
              </InputAdornment>
            )
          }}

            />
          <Typography style = {{fontSize: '12px', marginTop: '-20px'}}>What type of map do you want to create?</Typography>

        {isLoadingItems ? (
          <Typography>Loading...</Typography>
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
