import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/UserProfile/ProfilePage';
import NavBar from './components/NavigationBar/NavBar';
import MapCreationWrapper from './components/MapCreationWrapper';
import ExplorePage from './components/ExplorePage';
import MapView from './components/MapView/MapView'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const theme = createTheme({
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
          }
        }
      }
      // Add any other theme customizations here
    }
  });

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
              <Route path = "/mapView" element={<MapView/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
