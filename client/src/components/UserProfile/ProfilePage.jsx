import React from 'react';
import Sidebar from './SideBar';
import UserMapContent from './UserMapContent';
import '../../styles/profilePage.css';

export default function ProfilePage() {
  return (
    <div className="profile">
      <Sidebar />
      <UserMapContent />
    </div>
  );
}
