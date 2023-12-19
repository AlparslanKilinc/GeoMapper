import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Divider, TextField, Typography, Autocomplete } from '@mui/material';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import loadScript from '../../../googleMapsLoad';
import {
  generateRandomColumn,
  addPoint,
  addDataFromCSVorExcel,
  validateRow,
  changeMatchKey
} from '../../../redux-slices/mapGraphicsDataSlice';
import '../../../styles/mapDataEditingPage.css';
import AlertComponent from '../../AlertComponent';

export default function DataEditorLeftPane() {
  const dispatch = useDispatch();
  const points = useSelector((state) => state.mapGraphics.points);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const geoJSON = useSelector((state) => state.geojson.geojson);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debounceDelay = 500;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');
  const [matchKey, setMatchKey] = useState('');
  const [uploadedColumns, setUploadedColumns] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [open]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceDelay]);

  useEffect(() => {
    dispatch(addDataFromCSVorExcel({ data: uploadedData, mapGraphicsType }));
  }, [matchKey]);

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

  useEffect(() => {
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
  }, [debouncedSearchTerm, autocompleteService]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
              addPoint({
                name: place.name,
                lat: place.geometry.location.lat(),
                lon: place.geometry.location.lng(),
                color: '',
                size: 10,
                opacity: 0.6,
                height: 10
              })
            );
            const newIndex = points.length;
            dispatch(validateRow({ rowIndex: newIndex, mapGraphicsType, geoJSON }));
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop();
      if (fileExtension === 'csv') {
        parseCSV(file);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        parseExcel(file);
      } else {
        setError('Unsupported file format. Please upload a CSV or Excel file.');
      }
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        setUploadedColumns(result.meta.fields);
        setUploadedData(result.data);
        setOpen(true);
      },
      header: true
    });
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setUploadedColumns(Object.keys(json[0]));
      setUploadedData(json);
      setOpen(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const isNotPointMap = mapGraphicsType !== 'Symbol Map' && mapGraphicsType !== 'Spike Map';

  return (
    <div id="data-editing-page-left">
      <div className="header-primary">
        <h2>{mapGraphicsType}</h2>
        <Divider style={{ width: '50%' }} />
      </div>

      <h3 className="secondary-title">Add Data</h3>
      <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <LoadingButton
          component="label"
          startIcon={<CloudUploadIcon />}
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
        >
          Upload File (CSV or Excel)
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </LoadingButton>
        {isNotPointMap && (
          <Autocomplete
            value={matchKey}
            options={uploadedColumns}
            onChange={(_, value) => {
              setMatchKey(value);
              dispatch(changeMatchKey(value));
            }}
            renderInput={(params) => <TextField {...params} label="Match Key" variant="outlined" />}
          />
        )}

        {error && <Typography color="error">{error}</Typography>}
        {(mapGraphicsType === 'Heat Map' || mapGraphicsType === 'Dot Density Map') && (
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
      {(mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') && (
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

      {open && (
        <AlertComponent
          handleCloseAlert={handleClose}
          autoHideDuration={2000}
          alertSeverity="success"
          alertMessage="CSV/Excel file uploaded successfully! Please select a match key."
        />
      )}
    </div>
  );
}
