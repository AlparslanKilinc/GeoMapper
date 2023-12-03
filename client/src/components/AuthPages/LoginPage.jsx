import '../../styles/loginPage.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { loginUser, resetErrorMessage } from '../../redux-slices/authSlice';
import GoogleIcon from '@mui/icons-material/Google';
import { gapi } from 'gapi-script';
import CopyRight from '../Landing/CopyRight';
import Box from '@mui/material/Box';

export default function LoginPage() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.message);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google API script
    function start() {
      gapi.client.init({
        clientId: '463254320848-cpd89v6bolf2n4gs5bcdo3g119788j37.apps.googleusercontent.com',
        scope: 'email'
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  useEffect(() => {
    // reset on component mount
    dispatch(resetErrorMessage());
    if (loggedIn) {
      navigate('/explore');
    }
    // Reset error message when leaving page
    return () => {
      dispatch(resetErrorMessage());
    };
  }, [loggedIn, navigate, dispatch]);

  const validateForm = () => {
    let errors = {};
    if (!userName) errors.userName = 'Username is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(resetErrorMessage());
      dispatch(loginUser({ userName, password }));
    } else {
      setFormErrors(errors);
    }
  };

  const handleGoogleLogin = () => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn().then(
      (googleUser) => {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        // TODO: Login Logic After user successfully logs in Could include a redirect or updating redux loggedIn state
      },
      (error) => {
        console.error(error);
      }
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
            fullWidth
            error={!!formErrors.userName}
            helperText={formErrors.userName}
            InputLabelProps={{ shrink: true }}
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
            fullWidth
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputLabelProps={{ shrink: true }}
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
          <Button
            style={{ backgroundColor: '#40E0D0' }}
            variant="contained"
            id="googleLogin"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Sign in with Google
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
