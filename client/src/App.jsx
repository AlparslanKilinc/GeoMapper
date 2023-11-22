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
import React, {useEffect, useState} from "react";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const handleDarkModeClick = () => {
       setIsDark((prevIsDark) => {
      const newIsDark = !prevIsDark;
      localStorage.setItem('darkMode', JSON.stringify(newIsDark));
      return newIsDark;
    });

  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#40E0D0'
      }
    },
    typography: {
      allVariants: {
        color: 'black'
      },
      button: {
        textTransform: 'none'
      },
      fontFamily: [
        'Outfit', // The name of your font family
        'Arial', // Fallback font
        'sans-serif' // Generic font family
      ].join(',')
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "white",
            color: "#40e0d0",
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'white'
          }
        }
      },

      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: ' #40e0d0',
            '&:hover': {
              backgroundColor: ' #006666',
            },
          }
        },
      },
        MuiLoadingButton: {
          styleOverrides: {
            root: {
              backgroundColor: ' #40e0d0',
              '&:hover': {
                backgroundColor: ' #006666',
              },
            }
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              border: '1px solid #212121',
            }
          }

        },


      }
    }
  });




  const darkTheme = createTheme({
    palette: {
      background: {
        default: "#212121"
      },
    },
    typography: {
      allVariants: {
        color: 'white'
      },
      button: {
        textTransform: 'none'
      },
      fontFamily: [
        'Outfit', // The name of your font family
        'Arial', // Fallback font
        'sans-serif' // Generic font family
      ].join(','),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#212121",
            color: "006666",
          }
        }

      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#006666',
            '&:hover': {
              backgroundColor: 'black',
            },
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#333333',
            color: 'white'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a1a1a',
            color: 'white'
          }
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'var(--main-color)'
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#333333',
          }
        }
      },
      MuiNavigationButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#006666',
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            border: '1px solid white',
          }
        }
      },
    }



  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeProvider theme = {isDark ? darkTheme : theme}>
      <Router>
        <CssBaseline />
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
      </Router>
    </ThemeProvider>
  );
}

export default App;
