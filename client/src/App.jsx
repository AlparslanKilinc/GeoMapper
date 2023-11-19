import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/UserProfile/ProfilePage';
import NavBar from './components/NavigationBar/NavBar';
import MapCreationWrapper from './components/MapCreationWrapper';
import ExplorePage from './components/ExplorePage';
import MapView from './components/MapView/MapView';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChangePassword from './components/ChangePassword';
import ForgotPassword from './components/ForgotPassword';
import RecoveryCode from './components/RecoveryCode';
import SetNewPassword from './components/SetNewPassword';
import {useState} from "react";
import ToggleDarkMode from './components/ToggleDarkMode'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

function App() {
  const [isDark, setIsDark] = useState(false)
  const handleDarkModeClick = () => {
    setIsDark(!isDark)
  }
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



  return (
    <ThemeProvider theme = {theme}>
      <Router>
        <div id="root" className={isDark ? 'dark-mode' : 'light-mode'}>
        <NavBar  isDark={isDark} handleDarkModeClick = {handleDarkModeClick}/>
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
          <Route path="/recoveryCode" element={<RecoveryCode />} />
          <Route path="/setNewPassword" element={<SetNewPassword />} />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
