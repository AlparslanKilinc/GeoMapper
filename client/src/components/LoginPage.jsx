import '../styles/loginPage.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import GeoMapperImage from '../assets/GeoMapperLogo.svg';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser } from '../redux-slices/authSlice';
import GoogleIcon from '@mui/icons-material/Google';
import CopyRight from './CopyRight';

import Box from '@mui/material/Box';

export default function LoginPage() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth?.message);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/explore');
    }
  }, [loggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    dispatch(
      loginUser({
        userName: formData.get('userName'),
        password: formData.get('password')
      })
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          marginTop: '5rem',
          padding: '1rem',
          gap: '0.2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
          <h1>Log into GeoMapper</h1>
        </div>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="User Name"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            size="small"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            margin="small"
            required
            fullWidth
          />
          <div style={{ minHeight: '12px', color: 'red', margin: '5px' }}>
            {errorMessage && <span>{errorMessage}</span>}
          </div>
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            loadingPosition="center"
            variant="contained"
            style={{ backgroundColor: '#40E0D0' }}
          >
            Login
          </LoadingButton>
        </Box>

        <Divider className="divider">OR</Divider>
        <div className="login-button-group">
          <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
            <GoogleIcon />
            Sign in
          </Button>
          <Link className="link" to={'/register'}>
            <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
              Register
            </Button>
          </Link>
          <Link className="link" to={'/forgotPassword'}>
            <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="register">
              Forgot Password
            </Button>
          </Link>
        </div>
      </Box>
      <CopyRight />
    </div>
  );
}
