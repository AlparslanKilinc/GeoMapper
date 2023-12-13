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
import { getMapGraphicsDataById } from '../../redux-slices/mapGraphicsDataSlice.js';
import { getMapStylesDataById } from '../../redux-slices/mapStylesSlice.js';
import { getMapMetaDataById } from '../../redux-slices/mapMetadataSlice.js';
import { fetchGeojsonById } from '../../redux-slices/geoJSONSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function MapCard({ map }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    publishDate,
    _id,
    graphicsDataId,
    stylesDataId,
    geoDataId
  } = map;

  const handleMapClick = async () => {
    const draft = publishDate === null;
    if (draft) {
      try {
        console.log(geoDataId);
        const mapGeoData = await dispatch(fetchGeojsonById(geoDataId));
        const mapGraphicsData = await dispatch(getMapGraphicsDataById(graphicsDataId));
        const mapStylesData = await dispatch(getMapStylesDataById(stylesDataId));
        const mapMetaData = await dispatch(getMapMetaDataById(_id));

        // After all promises have resolved, navigate to the desired route
        navigate('/mapCreation/GraphicsEditor');
      } catch (error) {
        // Handle any errors that might occur during the dispatch
        console.error('Error loading map data:', error);
      }
    } else {
      // Show map view page using map's data from props
      console.log('map not in drafts');
    }
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
  // Popup functions
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
        <CardActionArea onClick={handleMapClick}>
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
