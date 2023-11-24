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
    themeName: 'light',
    palette: {
      primary: {
        main: '#40E0D0'
      },
      iconColor: 'black',
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
            backgroundColor: "#fff",
            color: "#40e0d0",
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: '#fff'
          }
        }
      },

      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: ' #40e0d0',
            color: 'black',
            '&:hover': {
              backgroundColor: ' #006666',
              color: 'black',
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
          MuiDrawer: {
            styleOverrides: {
              root: {
                backgroundColor: '#fff',
              }
            }
          },



      }
    }
  });


  const darkTheme = createTheme({
    themeName: 'dark', // Add a custom property to identify the theme
    palette: {
      background: {
        default: "#212121",
        secondaryDefault: "#333333",
      },
      iconColor: '#fff',
      drawer: {
        background: '#212121', // specify your desired background color
      },
      primary: {
        main: '#40E0D0'
      },
      divider: '#fff'
    },
    typography: {
      allVariants: {
        color: '#fff',
        secondaryColor: '#40E0D0'
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
            color: "#006666",
          }
        }

      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#fff',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#006666',
            color: '#fff',
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
            color: '#fff'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a1a1a',
            color: '#fff'
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
            '& .MuiInputBase-input': {
              color: '#fff',
            },
          },
        }
      },
      MuiNavigationButton: {
        styleOverrides: {
          root: {
            backgroundColor: '#006666',
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121',
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121',
          }
        }
      },
      MuiBPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121',
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            border: '1px solid #fff',
          }
        }
      },
      MuiAccordian: {
        styleOverrides: {
          root: {
            backgroundColor: '#212121',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#333333',
          }
        }
      },


    },

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
          <Route path="/" element={<LandingPage theme={isDark ? darkTheme : theme}/>} />
          <Route path="/register" element={<RegisterPage theme={isDark ? darkTheme : theme}/>} />
          <Route path="/login" element={<LoginPage theme={isDark ? darkTheme : theme}/>} />
          <Route path="/profile" element={<ProfilePage theme={isDark ? darkTheme : theme}/>} />
          <Route path="/explore" element={<ExplorePage theme={isDark ? darkTheme : theme}/>} />
          <Route path="/mapCreation" element={<MapCreationWrapper theme={isDark ? darkTheme : theme} />} />
          <Route path="/mapView" element={<MapView theme={isDark ? darkTheme : theme}/>} />
          <Route path="/changePassword" element={<ChangePassword theme={isDark ? darkTheme : theme}/>} />
          <Route path="/forgotPassword" element={<ForgotPassword theme={isDark ? darkTheme : theme}/>} />
          <Route path="/recoveryCode" element={<RecoveryCode  theme={isDark ? darkTheme : theme}/>} />
          <Route path="/setNewPassword" element={<SetNewPassword theme={isDark ? darkTheme : theme}/>} />
        </Routes>
      </Router>
    </ThemeProvider>

  );
}

export default App;
