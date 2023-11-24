import { React, useEffect,  } from 'react';
import '../../styles/navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import Logo from './Logo.jsx';
import UserIconMenu from './UserIconMenu';
import Search from '../SearchBar';
import ToggleDarkMode from "../ToggleDarkMode.jsx";

const AuthButton = ({ loggedIn }) => {
  if (loggedIn) {
    return <UserIconMenu />;
  }

  return (
      <Link className="link" to={'/login'}>
        <IconButton color="inherit" aria-label="login">
          <LoginIcon />
          <span style={{ fontSize: '18px' }}>Login</span>
        </IconButton>
      </Link>
  );
};

export default function NavBar({isDark, handleDarkModeClick}) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const location = useLocation();
  const isExplorePage = location.pathname == '/explore';
  return (
      <AppBar position="static">
        <Toolbar className={'navigationBar'}>
          <Logo isDark = {isDark}/>
          <div className={'iconContainer'}>
            {isExplorePage && <Search/>}
            <ToggleDarkMode isDark = {isDark} handleDarkModeClick={handleDarkModeClick} />
            <Link className="link" to={'/explore'}>
              <IconButton id = "exploreButton" color="inherit" aria-label="explore">
                <ExploreIcon />
              </IconButton>
            </Link>
            <Link className="link" to={'/mapCreation'}>
              <IconButton id = 'mapCreation' color="inherit" aria-label="add">
                <AddIcon />
              </IconButton>
            </Link>
            <AuthButton id = "loginButton" loggedIn={loggedIn} />
          </div>
        </Toolbar>
      </AppBar>
  );
}