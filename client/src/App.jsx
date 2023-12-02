import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import RegisterPage from './components/AuthPages/RegisterPage';
import LoginPage from './components/AuthPages/LoginPage';
import ProfilePage from './components/AuthPages/UserProfile/ProfilePage';
import NavBar from './components/NavigationBar/NavBar';
import MapCreationWrapper from './components/MapCreation/MapCreationWrapper';
import ExplorePage from './components/Explore/ExplorePage';
import MapView from './components/MapView/MapView';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChangePassword from './components/AuthPages/ChangePassword';
import ForgotPassword from './components/AuthPages/ForgotPassword';
import SetNewPassword from './components/AuthPages/SetNewPassword';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoggedIn } from './redux-slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#40E0D0' // Your desired primary color
        // You can also specify light, dark, and contrastText if needed
      }
    },
    typography: {
      fontFamily: [
        'Outfit', // The name of your font family
        'Arial', // Fallback font
        'sans-serif' // Generic font family
      ].join(',')
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // Name of the rule
            textTransform: 'none' // Change text transform
          },
          indicator: {
            color: 'green' // Your desired color
          }
        }
      },

      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: 'white', // White background for the accordion
            boxShadow: 'none', // Removes box shadow
            '&:before': {
              display: 'none' // Removes the pseudo-element that can also add a shadow
            },
            '&.MuiPaper-elevation0': {
              boxShadow: 'none' // Ensures no shadow when the elevation is set to 0
            }
          }
        }
      },
      // Style overrides for AccordionSummary
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: 'white', // White background for the accordion summary
            color: 'black', // Black text color
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(180deg)', // Ensures the icon rotates when expanded
              color: '#40E0D0'
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              color: 'black' // Black color for the expand icon
            }
          }
        }
      }
      // Add any other theme customizations here
    }
  });

  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/mapCreation" element={<MapCreationWrapper />} />
          <Route path="/mapView" element={<MapView />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/setNewPassword/:id/:token" element={<SetNewPassword/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
