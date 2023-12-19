import React from 'react';
import CopyRight from '../../Landing/CopyRight';
import '../../../styles/profilePage.css';
import ProfileNavBar from './ProfileNavBar';

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <ProfileNavBar />
      <CopyRight />
    </div>
  );
}
