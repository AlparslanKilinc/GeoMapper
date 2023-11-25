import React, { useState } from 'react';
import '../../styles/profileNavBar.css';
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


export default function ProfileNavBar({theme}) {
  console.log(theme)
  const [Select, setSelect] = useState(NavState.DRAFTS);
  const [Content, setContent] = useState(<Drafts theme = {theme}/>);

  let handleButton = (input) => {
    switch (input) {
      case NavState.BOOKMARKS:
        setSelect(NavState.BOOKMARKS);
        setContent(<Bookmarks theme = {theme}/>);
        break;
      case NavState.DRAFTS:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts  theme = {theme}/>);
        break;
      case NavState.PUBLISHED_MAPS:
        setSelect(NavState.PUBLISHED_MAPS);
        setContent(<PublishedMaps theme = {theme}/>);
        break;
      default:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts theme = {theme}/>);
        break;
    }
  };

  return (
    <div className="navbar"  style={{ backgroundColor: theme.palette.background.default }} >
      <li className="nav-list">
        <button
          onClick={() => handleButton(NavState.DRAFTS)}
          className="nav-button"
          style={{ borderBottom: Select === NavState.DRAFTS ? '3px solid #40e0d0' : 'none',
          color: theme.typography.allVariants.color}}
        >
          <EditIcon sx = {{color: theme.palette.iconColor}}/>
          Drafts
        </button>

        <button
          onClick={() => handleButton(NavState.PUBLISHED_MAPS)}
          className="nav-button"
          style={{
            borderBottom: Select === NavState.PUBLISHED_MAPS ? '3px solid #40e0d0' : 'none',
            color: theme.typography.allVariants.color
          }}
        >
          <MapIcon sx = {{color: theme.palette.iconColor}}/>
          Published Maps
        </button>

        <button
          onClick={() => handleButton(NavState.BOOKMARKS)}
          className="nav-button"
          style={{ borderBottom: Select === NavState.BOOKMARKS ? '3px solid #40e0d0' : 'none',
            color: theme.typography.allVariants.color}}
        >
          <BookmarkBorderIcon sx = {{color: theme.palette.iconColor}}/>
          Bookmarks
        </button>
      </li>
      <Divider/>
      <div className="profile" style={{ backgroundColor: theme.palette.background.default }}>
        <Sidebar theme = {theme}/>
        <div className="content">{Content}</div>
      </div>
    </div>
  );
}
