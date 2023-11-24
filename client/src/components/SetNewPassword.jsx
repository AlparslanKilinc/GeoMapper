import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import '../styles/loginPage.css';

export default function SetNewPassword({theme}) {
  const navigate = useNavigate();

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    alignSelf: 'flex-start',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const handleSubmit = (event) => {
    console.log('Submit New Password');
  };

  const goBack = () => {
    navigate('/RecoveryCode');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100vw', width: '98%' }}>
      <div style={{ alignSelf: 'flex-start', width: '100%', paddingTop: '1rem' }}>
        <NavigationButton variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
          Back
        </NavigationButton>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
          <h1>Forgot Password</h1>
        </div>
        <p>Enter your new password.</p>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="New Password"
            type="text"
            autoComplete="New Password"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            label="Confirm New Password"
            name="Confirm New Password"
            type="text"
            autoComplete="Confirm New Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#40E0D0' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}
