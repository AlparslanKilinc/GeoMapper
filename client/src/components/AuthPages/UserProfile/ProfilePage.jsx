import React from 'react';
import CopyRight from '../../Landing/CopyRight';
import '../../../styles/profilePage.css';
import ProfileNavBar from './ProfileNavBar';
import {useSelector} from "react-redux";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <ProfileNavBar />
      <CopyRight />
    </div>
  );
}
