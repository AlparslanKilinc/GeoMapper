import '../styles/loginPage.css';
import { useEffect } from 'react';
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

import Box from '@mui/material/Box';

export default function LoginPage() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
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
        <h1>Log into GeoMapper</h1>
      </div>

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          id="userName"
          label="User Name"
          name="userName"
          autoComplete="User Name"
          autoFocus
        />
        <TextField
          size="small"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
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
      <Link className="link" to={'/register'}>
        <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id = "register">
          Register
        </Button>
      </Link>
    </Box>
  );
}
