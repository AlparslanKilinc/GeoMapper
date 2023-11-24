import React, { useState } from 'react';
import '../../styles/profileNavBar.css';
import Drafts from './Drafts';
import Bookmarks from './Bookmarks';
import PublishedMaps from './PublishedMaps';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EditIcon from '@mui/icons-material/Edit';
import MapIcon from '@mui/icons-material/Map';

const NavState = {
  DRAFTS: 'Drafts',
  BOOKMARKS: 'Bookmarks',
  PUBLISHED_MAPS: 'PublishedMaps'
};

export default function ProfileNavBar({theme}) {
  const [Select, setSelect] = useState(NavState.DRAFTS);
  const [Content, setContent] = useState(<Drafts theme = {theme}/>);

  let handleButton = (input) => {
    switch (input) {
      case NavState.BOOKMARKS:
        setSelect(NavState.BOOKMARKS);
        setContent(<Bookmarks theme = {theme} />);
        break;
      case NavState.DRAFTS:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts theme = {theme} />);
        break;
      case NavState.PUBLISHED_MAPS:
        setSelect(NavState.PUBLISHED_MAPS);
        setContent(<PublishedMaps  theme = {theme} />);
        break;
      default:
        setSelect(NavState.DRAFTS);
        setContent(<Drafts  theme = {theme} />);
        break;
    }
  };

  return (
    <div className="navbar">
      <li className="nav-list">
        <button
          onClick={() => handleButton(NavState.DRAFTS)}
          className="nav-button"
          style={{ color:theme.typography.allVariants.color,  borderBottom: Select === NavState.DRAFTS ? '3px solid #40e0d0' : 'none' }}
        >
          <EditIcon />
          Drafts
        </button>

        <button
          onClick={() => handleButton(NavState.PUBLISHED_MAPS)}
          className="nav-button"
          style={{
            color:theme.typography.allVariants.color, borderBottom: Select === NavState.PUBLISHED_MAPS ? '3px solid #40e0d0' : 'none'
          }}
        >
          <MapIcon />
          Published Maps
        </button>

        <button
          onClick={() => handleButton(NavState.BOOKMARKS)}
          className="nav-button"
          style={{ color:theme.typography.allVariants.color , borderBottom: Select === NavState.BOOKMARKS ? '3px solid #40e0d0' : 'none' }}
        >
          <BookmarkBorderIcon />
          Bookmarks
        </button>
      </li>
      <div className="content">{Content}</div>
    </div>
  );
}
