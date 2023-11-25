import React, { useState } from 'react';
import '../../../styles/profileNavBar.css';
import Drafts from './Drafts';
import Bookmarks from './Bookmarks';
import PublishedMaps from './PublishedMaps';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';
import { Divider } from '@mui/material';
import Sidebar from './SideBar';

const NavState = {
  DRAFTS: 'Drafts',
  BOOKMARKS: 'Bookmarks',
  PUBLISHED_MAPS: 'PublishedMaps'
};

export default function ProfileNavBar() {
  const [Select, setSelect] = useState(NavState.DRAFTS);
  const [Content, setContent] = useState(<Drafts />);

  let handleButton = (input) => {
    switch (input) {
      case NavState.BOOKMARKS:
        setSelect(NavState.BOOKMARKS);
        setContent(<Bookmarks />);
        break;
      case NavState.DRAFTS:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts />);
        break;
      case NavState.PUBLISHED_MAPS:
        setSelect(NavState.PUBLISHED_MAPS);
        setContent(<PublishedMaps />);
        break;
      default:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts />);
        break;
    }
  };

  return (
    <div className="navbar">
      <li className="nav-list">
        <button
          onClick={() => handleButton(NavState.DRAFTS)}
          className="nav-button"
          style={{ borderBottom: Select === NavState.DRAFTS ? '3px solid #40e0d0' : 'none' }}
        >
          <EditIcon />
          Drafts
        </button>

        <button
          onClick={() => handleButton(NavState.PUBLISHED_MAPS)}
          className="nav-button"
          style={{
            borderBottom: Select === NavState.PUBLISHED_MAPS ? '3px solid #40e0d0' : 'none'
          }}
        >
          <MapIcon />
          Published Maps
        </button>

        <button
          onClick={() => handleButton(NavState.BOOKMARKS)}
          className="nav-button"
          style={{ borderBottom: Select === NavState.BOOKMARKS ? '3px solid #40e0d0' : 'none' }}
        >
          <BookmarkBorderIcon />
          Bookmarks
        </button>
      </li>
      <Divider/>
      <div className="profile">
        <Sidebar />
        <div className="content">{Content}</div>
      </div>
    </div>
  );
}
