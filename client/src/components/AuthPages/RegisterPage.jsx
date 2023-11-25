import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { registerUser, resetErrorMessage } from '../../redux-slices/authSlice';
import GeoMapperImage from '../../assets/GeoMapperLogo.svg';
import Box from '@mui/material/Box';

export default function RegisterPage() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordVerify: ''
  });

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    // Validation Logic
    if (!formData.userName) errors.userName = 'Username is required';
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.passwordVerify) errors.passwordVerify = 'Password verify is required';
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.passwordVerify) {
      errors.passwordVerify = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(formData));
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={GeoMapperImage} alt="GeoMapper Logo" width="50" height="50" />
          <h1>Register</h1>
        </div>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                autoComplete="fname"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="User Name"
                value={formData.userName}
                onChange={handleInputChange}
                error={!!formErrors.userName}
                helperText={formErrors.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                fullWidth
                name="passwordVerify"
                label="Password Verify"
                type="password"
                id="passwordVerify"
                autoComplete="new-password"
                value={formData.passwordVerify}
                onChange={handleInputChange}
                error={!!formErrors.passwordVerify}
                helperText={formErrors.passwordVerify}
              />
            </Grid>
          </Grid>
          <div style={{ minHeight: '12px', color: 'red', margin: '5px' }}>
            {errorMessage && <span>{errorMessage}</span>}
          </div>
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            loadingPosition="center"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#40E0D0' }}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
        <Divider className="divider"> OR </Divider>
        <Link className="link" to={'/login'}>
          <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id="loginButton">
            Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
