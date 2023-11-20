import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MapIcon from '@mui/icons-material/Map';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-slices/authSlice';
import { getLoggedIn } from '../../redux-slices/authSlice';
import '../../styles/userIconMenu.css';

export default function UserIconMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const serverBaseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://geomapper-ylm6.onrender.com/'
      : 'http://localhost:5001/';

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  const userData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    profilePicPath: user?.profilePicPath ? `${serverBaseUrl}${user.profilePicPath}` : ''
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
        <MenuItem sx={{ margin: '-10px' }}>
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
        <MenuItem onClick={handleMenuClick} sx={{ padding: '5px' }}>
          <AccountCircleIcon sx={{ color: '#BBBBBB' }} />
          Your Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClick} sx={{ padding: '5px' }}>
          <MapIcon sx={{ color: '#BBBBBB' }} />
          Your Maps
        </MenuItem>
        <MenuItem onClick={handleMenuClick} sx={{ padding: '5px' }}>
          <AssignmentIcon sx={{ color: '#BBBBBB' }} />
          Your Drafts
        </MenuItem>
        <MenuItem onClick={handleMenuClick} sx={{ padding: '5px' }}>
          <BookmarkBorderIcon sx={{ color: '#BBBBBB' }} />
          Your Bookmarks
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
