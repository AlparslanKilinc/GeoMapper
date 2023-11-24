import React, {useState} from 'react';
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
import Box from "@mui/material/Box";
import CopyRight from "../CopyRight.jsx";
export default function MapView({theme}) {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isShareOpen, setShareOpen] = useState(false);
    const [popUpTitle, setPopUpTitle] = useState("");
    const [forkForm, setForkForm] = useState(false);
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

    return (
        <div className = "mapview-container">
            <div className = "map-info">
                <span><h1>World Population</h1></span>
                <span ><p className = "map-description">By John Doe     September 1, 2018</p></span>
                <span ><p className = "map-description">This is my description............</p></span>
            </div>
            <Box sx={{
                height: '500px',
                width: '1100px',
                borderRadius: '10px',
                marginTop: '80px',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'black'

            }} className = 'map-comments-and-display'>
                <img src = "https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png" style={{ maxWidth: '70%' }}/>
                <Paper sx = {{ width: '30%'}}>
                    <div className = "comment" style = {{height: '90%'}} >
                        <Comment/>
                    </div>
                    <Divider/>
                    <div className = "post-comment"  style = {{ height: '10%'}}>
                        {loggedIn ? (
                            <div className= "comment-form">
                                <Paper
                                    component="form"
                                    sx={{ display: 'flex', alignItems: 'center', width: 330}}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1, color: theme.typography.allVariants.color }}
                                        placeholder="Post a comment"
                                        inputProps={{ 'aria-label': 'Post a comment'}}
                                    />
                                    <Button variant="contained"
                                            sx = {{backgroundColor: "var(--main-color)",
                                                '&:hover': 'var(--dark-color)', mr: '5px'}}
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
                </Paper>
                <Divider/>
            </Box>
            <div className = "actions"  style={{ display: 'flex', gap: '8px' }}>
                <IconButton>
                    <ThumbUpOffAltIcon  sx = {{color: theme.palette.iconColor}} className = "like"onClick = {handleLike}/>
                </IconButton>
                <IconButton>
                    <ShareIcon  sx = {{color: theme.palette.iconColor}} className = "export" onClick = {handleFork}/>
                </IconButton>

                <IconButton>
                    <IosShareIcon   sx = {{color: theme.palette.iconColor}} className = "share" onClick = {handleShare}/>
                </IconButton>
                <IconButton>
                    <BookmarkBorderIcon  sx = {{color: theme.palette.iconColor}} className = "bookmarks" onClick = {handleBookmark}/>
                </IconButton>
            </div>
            {isPopupOpen && <PopUp open={isPopupOpen} onClose={closePopup} title={popUpTitle}/>}
            {forkForm && <ForkForm open = {forkForm} onClose = {closeForkForm}/>}
            {isShareOpen && <SharePopUp open={isShareOpen} onClose={closeShare} />}
            <CopyRight theme = {theme}/>
        </div>
    );
}
