import React, {useEffect, useState} from 'react';
import '../../styles/mapView.css'
import Comment from './Comment'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
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
import {styled} from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import {useNavigate} from "react-router-dom";
import  {addComment} from "../../redux-slices/commentsSlice.js";
import TextField from "@mui/material/TextField";

export default function MapView() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch()
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [forkForm, setForkForm] = useState(false);
    const navigate = useNavigate()
    const [commentText, setCommentText] = useState("");
    const user = useSelector((state) => state.auth.user);

    const NavigationButton = styled(Button)(({ theme }) => ({
        borderColor: '#40e0d0',
        color: '#40e0d0',
        '&:hover': {
            borderColor: '#40e0d0',
            backgroundColor: 'transparent'
        }
    }));

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
        console.log("map was liked")
        if(!loggedIn){
            setPopUpTitle("To like a map, please create an account");
            openPopup();
            return;
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
    }

    const goBack = () => {
        navigate('/explore')
    };

    const handleNewComment = () => {
        const author = user.userName
        console.log(user)
        dispatch(addComment({ author: author, text: commentText, profilePic: user.profilePicPath }));
        setCommentText("")

    }

    return (
        <div className = "mapview-container">
                <NavigationButton sx = {{ml: '-120px', mt: '10px'}}variant="outlined" startIcon={<ArrowBackIcon />} onClick={goBack}>
                    Back
                </NavigationButton>
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
                                    sx={{ p: '15px 4px', display: 'flex', alignItems: 'center', width: 320}}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1}}
                                        placeholder='Post a comment'
                                        id = "comment"
                                        value = {commentText ? commentText : ""}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    />
                                    <Button variant="contained"
                                            sx = {{backgroundColor: "var(--main-color)",
                                                    '&:hover': 'var(--dark-color)'}}
                                            onClick = {handleNewComment}
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
            <div className = "actions">
                <IconButton onClick = {handleLike}>
                    <ThumbUpOffAltIcon className = "like"/>
                 </IconButton>
                 <IconButton onClick = {handleFork}>
                    <ShareIcon className = "export"/>
                </IconButton>

                <IconButton onClick = {handleShare}>
                    <IosShareIcon className = "share"/>
                </IconButton>
                 <IconButton onClick = {handleBookmark}>
                     <BookmarkBorderIcon className = "bookmarks" />
                 </IconButton>

        </div>
            {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle}/>}
            {forkForm && <ForkForm open = {forkForm} onClose = {closeForkForm}/>}
            {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}
        </div>
);
}
