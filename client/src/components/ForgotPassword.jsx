import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux-slices/authSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import '../styles/loginPage.css';

export default function ForgotPassword() {
  const dispatch = useDispatch();
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
    dispatch(forgotPassword({ email }));
  };

  const goBack = () => {
    if (loggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <div style={{ alignSelf: 'flex-start', width: '100%', padding: '1rem' }}>
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
        <h1>Forgot Password</h1>
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
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}