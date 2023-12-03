import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Divider, TextField, Typography, Autocomplete } from '@mui/material';
import loadScript from '../../../googleMapsLoad';
import {
  generateRandomColumn,
  addLocationData,
} from '../../../redux-slices/mapGraphicsDataSlice';
import '../../../styles/mapDataEditingPage.css';

export default function DataEditorLeftPane() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');
  // This Basically loads the google maps api and allows the user to search for a place
  // It is like adding script tag to html but dynamically and only when needed
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;

    const initAutocomplete = () => {
      if (window.google && window.google.maps) {
        setAutocompleteService(new window.google.maps.places.AutocompleteService());
      } else {
        console.error('Google Maps API not loaded');
      }
    };

    loadScript(scriptUrl, initAutocomplete);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    if (autocompleteService && searchTerm) {
      autocompleteService.getPlacePredictions({ input: searchTerm }, (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
          setError('Error fetching place predictions');
          return;
        }
        setOptions(
          predictions.map((prediction) => ({
            label: prediction.description,
            place_id: prediction.place_id
          }))
        );
      });
    }
  };

  const handleOptionSelected = async (event, value) => {
    if (!value) return;
    setError('');

    try {
      const placesService = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );
      placesService.getDetails(
        {
          placeId: value.place_id,
          fields: ['name', 'geometry']
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            dispatch(
              addLocationData({
                name: place.name,
                lat: place.geometry.location.lat(),
                lon: place.geometry.location.lng()
              })
            );
          } else {
            setError('Error fetching place details');
          }
        }
      );
    } catch (error) {
      setError('Error processing the selected place');
    }
  };

  const handleRandomData = () => {
    dispatch(generateRandomColumn());
  };

  return (
    <div id="data-editing-page-left">
      <div className="header-primary">
        <h2>{mapGraphicsType}</h2>
        <Divider style={{ width: '50%' }} />
      </div>

      <h3 className="secondary-title">Add Data</h3>
      <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <LoadingButton
          startIcon={<CloudUploadIcon />}
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
        >
          Upload File (CSV or Excel)
        </LoadingButton>
        {mapGraphicsType === 'Heat Map' && (
          <LoadingButton
            startIcon={<AutoFixHighIcon />}
            variant="outlined"
            style={{ color: 'black', borderColor: 'black' }}
            onClick={handleRandomData}
          >
            Random Data
          </LoadingButton>
        )}
      </div>
      {mapGraphicsType !== 'Choropleth Map' && mapGraphicsType !== 'Heat Map' && (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
        >
          <Typography sx={{ padding: '1rem', width: '350px' }}>
            You can start adding symbols to your map by searching for a place.
          </Typography>
          <Autocomplete
            freeSolo
            disablePortal
            fullWidth
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for places"
                variant="outlined"
                onChange={handleSearchChange}
              />
            )}
            onChange={handleOptionSelected}
          />
          {error && <Typography color="error">{error}</Typography>}
        </div>
      )}
    </div>
  );
}
