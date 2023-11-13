import React from 'react';
import Sidebar from './SideBar';
import '../../styles/profilePage.css';
import ProfileNavBar from './ProfileNavBar';

export default function ProfilePage() {
  return (
    <div className="profile">
      <Sidebar />
      <ProfileNavBar />
    </div>
  );
}
