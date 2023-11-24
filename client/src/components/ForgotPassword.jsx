import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import '../styles/loginPage.css';
import CopyRight from "./CopyRight.jsx";

export default function ForgotPassword({theme}) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    alignSelf: 'flex-start',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/RecoveryCode');
  };

  const goBack = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
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
          justifyContent: 'top',
          padding: '1rem',
          gap: '0.5rem',
            height: '100vh',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
          <h1>Forgot Password</h1>
        </div>
        <p>Input your email address and we'll dispatch a recovery code to you.</p>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            autoComplete="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: '#40E0D0' }}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <CopyRight theme = {theme}/>
    </div>
  );
}
