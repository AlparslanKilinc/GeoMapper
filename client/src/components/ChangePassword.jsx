import '../styles/loginPage.css';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePassword } from '../redux-slices/authSlice';
import { useState } from 'react';
import CopyRight from './CopyRight';

import Box from '@mui/material/Box';

export default function ChangePasswordPage() {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(newPassword === event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    const formData = new FormData(event.currentTarget);
    dispatch(
      changePassword({
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
        id: user.id
      })
    ).then((response) => {
      if (response.error) {
      } else {
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
          <h1>Change Password</h1>
        </div>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            autoComplete="new-password"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!passwordsMatch}
            helperText={!passwordsMatch ? 'Passwords do not match' : ''}
            autoComplete="new-password-confirm"
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            loadingPosition="center"
            variant="contained"
            style={{ backgroundColor: '#40E0D0' }}
          >
            Change Password
          </LoadingButton>
        </Box>

        <Link className="link" to={'/forgotPassword'}>
          <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="forgot-password">
            Forgot Password?
          </Button>
        </Link>
      </Box>
      <CopyRight />
    </div>
  );
}
