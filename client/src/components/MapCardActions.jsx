import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder.js";
import ShareIcon from "@mui/icons-material/Share.js";
import IosShareIcon from "@mui/icons-material/IosShare.js";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder.js";
import BookmarkIcon from '@mui/icons-material/Bookmark.js';
import {useDispatch, useSelector} from "react-redux";
import ForkForm from "./Explore/ForkForm.jsx";
import PopUp from "./Explore/PopUp.jsx";
import SharePopUp from "./Explore/SharePopUp.jsx";
import {CardActions} from "@mui/material";
import {updateLikes} from "../redux-slices/mapMetadataSlice.js";

const MapCardActions = ({map, isDraft}) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    let likes = useSelector((state) => state.mapMetadata.likes);
    const user = useSelector((state) => state.auth.user)
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState('');
    const [forkForm, setForkForm] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleLike = () => {
        if (!loggedIn) {
            setPopUpTitle('To like a map, please create an account');
            openPopup();
            return;
        }
        if (!liked) {
            setLiked(true);
            likes = likes + 1
            const mapId = map._id
            const userId = user.id
            dispatch(updateLikes({likes, mapId, userId}));
        } else {
            setLiked(false);
            likes = likes - 1
            const mapId = map._id
            const userId = user.id
            dispatch(updateLikes({likes, mapId, userId}));
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

  return(
      <CardActions>
          <IconButton onClick={handleLike}>
              {liked ? (
                  <FavoriteIcon className="like" style={{ color: 'red' }} />
              ) : (
                  <FavoriteBorderIcon className="like" />
              )}
          </IconButton>

          <IconButton onClick={handleFork}>
              <ShareIcon className="export" />
          </IconButton>

          <IconButton onClick={handleShare}>
              <IosShareIcon className="share" />
          </IconButton>

          <IconButton onClick={handleBookmark}>
              {bookmarked ? (
                  <BookmarkIcon className="bookmarks" style={{ color: '#40e0d0' }} />
              ) : (
                  <BookmarkBorderIcon className="bookmarks" />
              )}
          </IconButton>
          {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle} />}
          {forkForm && <ForkForm open={forkForm} onClose={closeForkForm} map = {map} />}
          {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}
      </CardActions>
  );
};

export default MapCardActions;
