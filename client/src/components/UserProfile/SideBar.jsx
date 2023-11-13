import '../../styles/sidebar.css';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getLoggedIn } from '../../redux-slices/authSlice';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  const defaultData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    bio: user?.bio || 'add bio here'
  };
  const [editMode, setEditMode] = useState(false);
  const [tempUserData, setTempUserData] = useState(defaultData);

  useEffect(() => {
    setTempUserData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      userName: user?.userName || '',
      bio: user?.bio || ''
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    setTempUserData(defaultData);
    setEditMode(false);
  };

  const handleSave = () => {
    const updatedData = {
      firstName: tempUserData.firstName,
      lastName: tempUserData.lastName,
      userName: user.userName === tempUserData.userName ? null : tempUserData.userName,
      bio: tempUserData.bio,
      id: user.id
    };
    dispatch(updateUser(updatedData));
    setEditMode(false);
  };

  return (
    <div className="sidebar">
      {user ? (
        <>
          <Avatar
            sx={{ border: '2px solid #f0f3f6', width: '300px', height: '300px' }}
            alt="Profile Pic"
          />
          <div className="personal-info">
            {!editMode ? (
              <>
                <div className="userName">
                  <h1>
                    {tempUserData.firstName} {tempUserData.lastName}
                  </h1>
                  <h3 style={{ color: 'gray' }}>{tempUserData.userName}</h3>
                </div>
                <p>{tempUserData.bio}</p>
                <button className="editProfileButton" onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
                <Link className="link" to={'/ChangePassword'}>
                  Change Password
                </Link>
              </>
            ) : (
              <>
                <input
                  name="firstName"
                  value={tempUserData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={tempUserData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
                <input
                  name="userName"
                  value={tempUserData.userName}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
                <textarea
                  name="bio"
                  value={tempUserData.bio}
                  onChange={handleInputChange}
                  placeholder="Bio"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
