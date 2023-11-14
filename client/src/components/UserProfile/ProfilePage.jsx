import React from 'react';
import Sidebar from './SideBar';
import CopyRight from '../CopyRight';
import '../../styles/profilePage.css';
import ProfileNavBar from './ProfileNavBar';

export default function ProfilePage() {
  return (
    <div className='profile-page'>
      <div className="profile">
        <Sidebar />
        <ProfileNavBar/>
      </div>
      <CopyRight/>
    </div>
  );
}
