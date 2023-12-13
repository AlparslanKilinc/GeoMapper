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
import { useClearStates } from '../MapCreation/useClearStates';
import '../../styles/userIconMenu.css';

export default function UserIconMenu({openConfirmationModal, setPath}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (location.pathname == '/mapCreation/OutlineSelection' || location.pathname == '/mapCreation/DataEditor' ) {
        openConfirmationModal();
        setPath('/profile');
    }else if( location.pathname == '/mapCreation/GraphicsEditor' ){
      clearStatesComplete();
      navigate('/profile');
    }else{
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    clearStatesComplete();
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
