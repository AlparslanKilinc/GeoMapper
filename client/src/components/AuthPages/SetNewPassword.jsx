import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import '../../styles/loginPage.css';
import {useDispatch} from "react-redux";
import {updatePassword} from "../../redux-slices/authSlice.js";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { id, token } = useParams();
    console.log(id)
    console.log(token)
    const [formErrors, setFormErrors] = useState('');

  const NavigationButton = styled(Button)(({ theme }) => ({
    borderColor: '#40e0d0',
    alignSelf: 'flex-start',
    color: '#40e0d0',
    '&:hover': {
      borderColor: '#40e0d0',
      backgroundColor: 'transparent'
    }
  }));

  const handleSubmit = async (event) => {
       event.preventDefault(); // Prevent the default form submission behavior
      const newPassword = event.target.elements.newPassword.value;
      const confirmNewPassword = event.target.elements.confirmNewPassword.value;
      if (newPassword.length < 8) {
          setFormErrors('Password must be at least 8 characters');
          return;
      }
      if (newPassword !== confirmNewPassword) {
          setFormErrors('Passwords do not match');
          return;
      }

      dispatch(updatePassword({ id, token, newPassword, confirmNewPassword }));
      navigate('/login');
  };

  const goBack = () => {
    navigate('/login');
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
            type="password"
            autoComplete="New Password"
            error = {formErrors}
            helperText={formErrors}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            label="Confirm New Password"
            name="Confirm New Password"
            type="password"
            autoComplete="Confirm New Password"
            error = {formErrors}
            helperText={formErrors}
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
