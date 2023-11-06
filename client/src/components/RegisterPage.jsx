import { useEffect } from 'react';
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
import { registerUser } from '../redux-slices/authSlice';
import Box from '@mui/material/Box';

export default function RegisterPage() {
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
      registerUser({
        userName: formData.get('userName'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        passwordVerify: formData.get('passwordVerify')
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <h1>Register</h1>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="User Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                required
                fullWidth
                name="passwordVerify"
                label="Password Verify"
                type="password"
                id="passwordVerify"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
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
          <Button style={{ backgroundColor: '#40E0D0' }} variant="contained" id = "loginButton">
            Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
