import React, { useState, useEffect } from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import PopUp from '../Explore/PopUp.jsx';
import SharePopUp from '../Explore/SharePopUp.jsx';
import ForkForm from '../Explore/ForkForm.jsx';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark.js";
import {getLoggedIn, getUserById} from "../../redux-slices/authSlice.js";

export default function MapCard ({showActions, metaData}) {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const dispatch = useDispatch()
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [forkForm, setForkForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Only dispatch getLoggedIn if user is not available
    if (metaData) {
      dispatch(getUserById(metaData.author));
    }
  }, [dispatch, metaData]);

  const author = useSelector((state) => state.auth.fetchedUser)
  console.log(author)

  const cardData = {
    description: metaData?.description || '',
    title: metaData?.title || '',
    tags: metaData?.tags || ''
  };
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
  }
  const closeForkForm = () => {
    setForkForm(false);
  }

  const handleTagClick = () =>{
    console.log("tag was clicked")
  }

  const handleLike = () =>{
    if(!loggedIn){
      setPopUpTitle("To like a map, please create an account");
      openPopup();
      return;
    }
    if (!liked){
      setLiked(true)
    }
    else{
      setLiked(false)
    }
  }
  const handleShare = () =>{
    openShare();
    return;
  }
  const handleFork = () =>{
    if(!loggedIn){
      setPopUpTitle("To fork a map, please create an account");
      openPopup();
      return;
    }
    else{
      openForkForm();
    }
  }
  const handleBookmark = () =>{
    if(!loggedIn){
      setPopUpTitle("To bookmark, please create an account");
      openPopup();
      return;
    }
    if (!bookmarked){
      setBookmarked(true);
    }
    else{
      setBookmarked(false);
    }

  }

  return(
      <div className = "mapCard">
        <Card sx={{ maxWidth: 300}}>
          <CardActionArea component={RouterLink} to={'/MapView'}>
            <CardMedia
                component="img"
                height="200"
                image="https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png"
                alt="green iguana"
            />
            <CardContent>
              <Link href = "ExplorePage#" underline = "hover" sx = {{color: 'var(--dark-color)', fontSize:'10px'}}>
                {author.userName}
              </Link>
              <Typography gutterBottom variant="h5">
                {cardData.title}</Typography>
              <Typography variant = "h8" component = "div">
                {cardData.description}
              </Typography>
            </CardContent>
            <div className = "tags">
              <Chip label="Chorpleth" sx={{mb:1 ,ml: 1}} onClick={handleTagClick}/>
              <Chip label="United States" sx={{mb:1  ,ml: 1}}  onClick={handleTagClick} />
              <Chip label="Election"sx={{mb:1  ,ml: 1}}  onClick={handleTagClick} />
              <Chip label="Map" sx={{mb:1  ,ml: 1}}  onClick={handleTagClick}/>
            </div>

          </CardActionArea>
          {showActions && <CardActions>
            <IconButton >
              {liked ? (
                  <FavoriteIcon onClick = {handleLike} className="like" style={{ color: 'red' }} />
              ) : (
                  <FavoriteBorderIcon onClick = {handleLike} className="like" />
              )}
            </IconButton>

            <IconButton>
              <ShareIcon className = "export" onClick = {handleFork}/>
            </IconButton>

            <IconButton >
              <IosShareIcon className = "share" onClick = {handleShare}/>
            </IconButton>

            <IconButton >
              {bookmarked ? (
                  <BookmarkIcon onClick = {handleBookmark} className = "bookmarks" style = {{color: '#40e0d0'}}/>
              ): (
                  <BookmarkBorderIcon onClick = {handleBookmark} className = "bookmarks"/>

              )}
            </IconButton>


          </CardActions>}
        </Card>
        {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle}/>}
        {forkForm && <ForkForm open = {forkForm} onClose = {closeForkForm}/>}
        {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}

      </div>
  );
}