import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PopUp from '../Explore/PopUp.jsx';
import SharePopUp from '../Explore/SharePopUp.jsx';
import ForkForm from '../Explore/ForkForm.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark.js';

export default function MapCard({ map }) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState('');
  const [forkForm, setForkForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const {
    title,
    description,
    tags,
    author,
    likes,
    forks,
    thumbnailUrl,
    authorUserName,
    publishDate
  } = map;
  const openPopup = () => {
    setPopupOpen(true);
  };
  const openShare = () => {
    setShareOpen(true);
  };
  const closeShare = () => {
    setShareOpen(false);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };

  const openForkForm = () => {
    setForkForm(true);
  };
  const closeForkForm = () => {
    setForkForm(false);
  };

  const handleTagClick = () => {
    console.log('tag was clicked');
  };

  const handleLike = () => {
    if (!loggedIn) {
      setPopUpTitle('To like a map, please create an account');
      openPopup();
      return;
    }
    if (!liked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  const handleShare = () => {
    openShare();
    return;
  };
  const handleFork = () => {
    if (!loggedIn) {
      setPopUpTitle('To fork a map, please create an account');
      openPopup();
      return;
    } else {
      openForkForm();
    }
  };
  const handleBookmark = () => {
    if (!loggedIn) {
      setPopUpTitle('To bookmark, please create an account');
      openPopup();
      return;
    }
    if (!bookmarked) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };

  const interactionButtons = (
    <CardActions>
      <IconButton>
        {liked ? (
          <FavoriteIcon onClick={handleLike} className="like" style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon onClick={handleLike} className="like" />
        )}
      </IconButton>

      <IconButton>
        <ShareIcon className="export" onClick={handleFork} />
      </IconButton>

      <IconButton>
        <IosShareIcon className="share" onClick={handleShare} />
      </IconButton>

      <IconButton>
        {bookmarked ? (
          <BookmarkIcon
            onClick={handleBookmark}
            className="bookmarks"
            style={{ color: '#40e0d0' }}
          />
        ) : (
          <BookmarkBorderIcon onClick={handleBookmark} className="bookmarks" />
        )}
      </IconButton>
    </CardActions>
  );

  return (
    <div className="mapCard">
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea component={RouterLink} to={'/MapView'}>
          <CardMedia component="img" height="200" image={thumbnailUrl} alt="green iguana" />
          <CardContent>
            <Link
              href="ExplorePage#"
              underline="hover"
              sx={{ color: 'var(--dark-color)', fontSize: '10px' }}
            >
              {authorUserName}
            </Link>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography variant="h8" component="div">
              {description}
            </Typography>
          </CardContent>
          <div className="tags">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={handleTagClick}
                variant="outlined"
                size="small"
              />
            ))}
          </div>
        </CardActionArea>
        {publishDate && interactionButtons}
      </Card>
      {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle} />}
      {forkForm && <ForkForm open={forkForm} onClose={closeForkForm} />}
      {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}
    </div>
  );
}
