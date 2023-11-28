import React from 'react';
import '../../../styles/mapDataEditingPage.css';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Divider, TextField, InputAdornment, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { generateRandomColumn } from '../../../redux-slices/mapGraphicsDataSlice';

export default function DataEditorLeftPane() {
  const dispatch = useDispatch();
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);

  const handleRandomData = () => {
    dispatch(generateRandomColumn());
  };

  return (
    <div id="data-editing-page-left">
      <div className="header-primary">
        <h2>{mapGraphicsType}</h2>
        <Divider style={{ width: '50%' }} />
      </div>

      <h3 className="secondary-title">add data</h3>
      <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <LoadingButton
          startIcon={<CloudUploadIcon />}
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
        >
          upload file (CSV or Excel)
        </LoadingButton>

        <LoadingButton
          startIcon={<AutoFixHighIcon />}
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
          onClick={handleRandomData}
        >
          random data
        </LoadingButton>
      </div>
      {mapGraphicsType !== 'Choropleth Map' && (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}
        >
          <Typography sx={{ padding: '1rem', width: '350px' }}>
            You can start adding symbols to your map by searching for a place
          </Typography>
          <TextField
            variant="outlined"
            label="Search for places"
            sx={{
              width: '80%'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
      )}
    </div>
  );
}
