import '../../styles/sidebar.css';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getLoggedIn, updateUserProfilePic } from '../../redux-slices/authSlice';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  const serverBaseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://geomapper-ylm6.onrender.com/auth'
      : 'http://localhost:5001/';

  const defaultData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    bio: user?.bio || '',
    picPath: user && user.profilePicPath ? `${serverBaseUrl}${user.profilePicPath}` : ''
  };
  const [tempUserData, setTempUserData] = useState(defaultData);

  useEffect(() => {
    setTempUserData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      userName: user?.userName || '',
      bio: user?.bio || '',
      picPath: user && user.profilePicPath ? `${serverBaseUrl}${user.profilePicPath}` : null
    });

    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [user, selectedImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePicChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
      setSelectedImage(file);
      console.log(file);
    }
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
    if (selectedImage) {
      const formData = new FormData();
      formData.append('profilePic', selectedImage);
      dispatch(updateUserProfilePic({ formData, id: user.id }));
    }
    dispatch(updateUser(updatedData));
    setEditMode(false);
  };
  console.log(tempUserData.picPath);

  return (
    <div className="sidebar">
      {user ? (
        <>
          <Avatar
            src={fileUrl || tempUserData.picPath}
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
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: 'none' }}
                  id="profile-pic-upload"
                />
                <label htmlFor="profile-pic-upload">
                  <Button variant="contained" component="span">
                    Upload Profile Picture
                  </Button>
                </label>
                <TextField
                  name="firstName"
                  value={tempUserData.firstName}
                  onChange={handleInputChange}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name="lastName"
                  value={tempUserData.lastName}
                  onChange={handleInputChange}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name="userName"
                  value={tempUserData.userName}
                  onChange={handleInputChange}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />

                <TextField
                  name="bio"
                  value={tempUserData.bio}
                  onChange={handleInputChange}
                  label="Bio"
                  multiline
                  placeholder="Bio"
                  minRows={3}
                  style={{ width: '100%', marginBottom: '16px' }}
                />
                <Button variant="contained" onClick={handleSave} style={{ width: '100px' }}>
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel} style={{ width: '100px' }}>
                  Cancel
                </Button>
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
