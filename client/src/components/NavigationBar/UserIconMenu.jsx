import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-slices/authSlice';
import { useSaveMap } from '../MapCreation/useSaveMap';
import { useClearStates } from '../MapCreation/useClearStates';
import '../../styles/userIconMenu.css';

export default function UserIconMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saveMapData = useSaveMap();
  const { clearStatesComplete } = useClearStates();
  const user = useSelector((state) => state.auth.user);

  const userData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    profilePicPath: user?.profilePicPath || ''
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    if (
      location.pathname == '/mapCreation/OutlineSelection' ||
      location.pathname == '/mapCreation/DataEditor' ||
      location.pathname == '/mapCreation/GraphicsEditor'
    ) {
      /// Save map data then clear states. save up to the stage you in or another solution
      // if saved before map graphics stage you will get container error
      // clearStatesComplete is a promise
      clearStatesComplete();
      navigate('/profile');
    } else {
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    // Could also Save Map Here too if someone logs out on accident
    clearStatesComplete();
    handleMenuClose();
    navigate('/');
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        {userData.profilePicPath ? (
          <Avatar
            src={userData.profilePicPath}
            sx={{ border: '2px solid #f0f3f6', width: '25px', height: '25px' }}
            alt="Profile Pic"
          />
        ) : (
          <AccountCircle />
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="profile-menu"
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleProfileClick} sx={{ margin: '-10px' }}>
          {userData.profilePicPath ? (
            <Avatar
              src={userData.profilePicPath}
              sx={{ border: '2px solid #f0f3f6', width: '25px', height: '25px' }}
              alt="Profile Pic"
            />
          ) : (
            <AccountCircle />
          )}
          <div className="text-info">
            <h3>
              {userData.firstName} {userData.lastName}
            </h3>
            <h6>{userData.userName}</h6>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
