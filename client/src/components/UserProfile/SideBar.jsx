import '../../styles/sidebar.css';
import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, getLoggedIn, resetErrorMessage } from '../../redux-slices/authSlice';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [FrontEndErrorMessage, setFrontEndErrorMessage] = useState('');
  const errorMessage = useSelector((state) => state.auth.message);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getLoggedIn());
  }, [dispatch]);

  const initialUserData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    bio: user?.bio || '',
    picPath: user?.profilePicPath || ''
  };

  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    setUserData({
      ...initialUserData,
      picPath: user?.profilePicPath || ''
    });

    if (errorMessage) {
      setEditMode(true);
    }

    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [user, errorMessage]);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setProfilePicPreview(url);
    }
  }, [selectedImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (event) => {
    setFrontEndErrorMessage('');
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image/') || file.size > MAX_FILE_SIZE) {
        setFrontEndErrorMessage('Please upload an image file less than 5MB');
        return;
      }

      const url = URL.createObjectURL(file);
      setProfilePicPreview(url);
      setSelectedImage(file);
    }
  };

  const handleCancel = () => {
    dispatch(resetErrorMessage());
    setFrontEndErrorMessage('');
    setUserData(initialUserData);
    setEditMode(false);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('userName', userData.userName);
    formData.append('bio', userData.bio);
    if (selectedImage) {
      formData.append('profilePic', selectedImage);
    }
    dispatch(updateUserData(formData));
    setEditMode(false);
  };

  return (
    <div className="sidebar">
      {user ? (
        <>
          <Avatar
            src={profilePicPreview || userData.picPath}
            sx={{ border: '2px solid #f0f3f6', width: '300px', height: '300px' }}
            alt="Profile Pic"
          />
          <div style={{ minHeight: '12px', color: 'red', margin: '5px' }}>
            {FrontEndErrorMessage}
          </div>
          <div className="personal-info">
            {!editMode ? (
              <ProfileView userData={userData} setEditMode={setEditMode} />
            ) : (
              <ProfileEdit
                userData={userData}
                handleInputChange={handleInputChange}
                handleProfilePicChange={handleProfilePicChange}
                handleSave={handleSave}
                handleCancel={handleCancel}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

function ProfileView({ userData, setEditMode }) {
  return (
    <>
      <div className="userName">
        <h1>
          {userData.firstName} {userData.lastName}
        </h1>
        <h3 style={{ color: 'gray' }}>{userData.userName}</h3>
      </div>
      <p>{userData.bio}</p>
      <button className="editProfileButton" onClick={() => setEditMode(true)}>
        Edit Profile
      </button>
      <Link className="link" to={'/ChangePassword'}>
        Change Password
      </Link>
    </>
  );
}

function ProfileEdit({
  userData,
  handleInputChange,
  handleProfilePicChange,
  handleSave,
  handleCancel,
  errorMessage
}) {
  return (
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
        value={userData.firstName}
        onChange={handleInputChange}
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        name="lastName"
        value={userData.lastName}
        onChange={handleInputChange}
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        name="userName"
        value={userData.userName}
        onChange={handleInputChange}
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        name="bio"
        value={userData.bio}
        onChange={handleInputChange}
        label="Bio"
        multiline
        placeholder="Bio"
        minRows={3}
        style={{ width: '100%', marginBottom: '16px' }}
      />
      <div style={{ minHeight: '12px', color: 'red', margin: '5px' }}>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
      <Button variant="contained" onClick={handleSave} style={{ width: '100px' }}>
        Save
      </Button>
      <Button variant="outlined" onClick={handleCancel} style={{ width: '100px' }}>
        Cancel
      </Button>
    </>
  );
}
