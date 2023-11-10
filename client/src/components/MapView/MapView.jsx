import React, {useState} from 'react';
import '../../styles/mapView.css'
import Comment from './Comment'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Divider from '@mui/material/Divider';
import {useSelector} from "react-redux";
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export default function MapView() {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [commentText, setCommentText] = useState("");
    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    return (
        <div className = "mapview-container">
            <div className = "map-info">
                <span><h1>World Population</h1></span>
                <span><p>By John Doe     September 1, 2018</p></span>
                <span><p>This is my description............</p></span>
            </div>
            <div className = "map-render">
                <img src = "https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png"/>
                <div className="content">
                  <div class = "comment">
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
            <div className = "actions">
                <ThumbUpOffAltIcon className = "like"/>
                <ShareIcon className = "export"/>
                <IosShareIcon className = "share"/>
                <BookmarkBorderIcon className = "bookmarks"/>
        </div>
        </div>
);
}
