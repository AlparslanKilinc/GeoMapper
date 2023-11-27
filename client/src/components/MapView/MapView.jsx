import React, {useState} from 'react';
import '../../styles/mapView.css'
import Comment from './Comment'
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Divider from '@mui/material/Divider';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import PopUp from '../PopUp';
import SharePopUp from '../SharePopUp'
import ForkForm from '../ForkForm'
import {Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from "@mui/icons-material/Bookmark.js";


export default function MapView() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [forkForm, setForkForm] = useState(false);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    let likes = 1000
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
        likes = likes + 1
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
        console.log(loggedIn)
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

    return (
        <div className = "mapview-container">
            <div className = "map-info">
                <span><h1>World Population</h1></span>
                <span><p>By John Doe     September 1, 2018</p></span>
                <span><p>This is my description............</p></span>
            </div>
            <div className = "map-render">
                <img src = "https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png"/>
                <div className="map-view-content">
                  <div className = "comment">
                      <div className = "comment-section">
                          <Comment/>
                      </div>
                  </div>
                    <Divider/>
                    <div className = "post-comment">
                        {loggedIn ? (
                            <div className= "comment-form">
                                <Paper
                                    component="form"
                                    sx={{ p: '12px 4px', display: 'flex', alignItems: 'center', width: 350}}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Post a comment"
                                        inputProps={{ 'aria-label': 'Post a comment' }}
                                    />
                                    <Button variant="contained"
                                            sx = {{backgroundColor: "var(--main-color)",
                                                    '&:hover': 'var(--dark-color)'}}
                                    >Post</Button>
                                </Paper>
                            </div>
                        ) : (
                            <p>
                                <a className="login-link" href="/login">
                                    Login
                                </a>{" "}
                                to comment
                            </p>)}
                    </div>
                </div>
            </div>
            <Typography variant = 'subtitle1' sx = {{mt: '20px', ml: '25px'}}>{likes} likes</Typography>
            <div className = "actions">
                <IconButton >
                    {liked ? (
                        <FavoriteIcon onClick = {handleLike} className="like" style={{ color: 'red' }} />
                    ) : (
                        <FavoriteBorderIcon onClick = {handleLike} className="like" />
                    )}
                 </IconButton>
                 <IconButton >
                    <ShareIcon onClick = {handleFork} className = "export" />
                </IconButton>
                <IconButton >
                    <IosShareIcon onClick = {handleShare} className = "share" />
                </IconButton >
                 <IconButton >
                     {bookmarked ? (
                         <BookmarkIcon onClick={handleBookmark} className = "bookmarks" style = {{color: '#40e0d0'}}/>
                     ): (
                         <BookmarkBorderIcon  onClick={handleBookmark} className = "bookmarks"/>

                     )}
                 </IconButton>
        </div>
            {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle}/>}
            {forkForm && <ForkForm open = {forkForm} onClose = {closeForkForm}/>}
            {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}
        </div>
);
}
