import React, {useState} from 'react';
import '../../styles/view.css';
import Modal from '@mui/material/Modal';

import {useDispatch, useSelector} from "react-redux";
import {addComment} from "../../redux-slices/commentsSlice.js";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send.js";
import Comment from "./Comment.jsx";
import {Divider} from "@mui/material";
import MapCardActions from '../MapCardActions'

const View = ({ map, open, onClose }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [newCommentText, setNewCommentText] = useState('');
  const user = useSelector((state) => state.auth.user)
    const comments = useSelector((state) => state.comments.comments)
  const dispatch = useDispatch()
  const handleAddComment = () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        author: user.userName, // replace with actual author data
        text: newCommentText,
        date_posted: new Date().toISOString(), // replace with actual date logic
        authorProfilePicture: user.profilePicPath
      };

      dispatch(addComment(newComment));
      setNewCommentText(''); // Clear the input field after posting
    }
  };


  return (
    <Modal open={open} onClose={onClose} className="view-background">
      <div className="view-content" onClick={(e) => e.stopPropagation()}>
        <div className="view-left-pane">
          <img src={map.thumbnailUrl} alt="map" />
        </div>
        <div className="view-right-pane">
          <div className="view-comment-section">
                  {comments.map((comment, index) => (
                      <Comment key={index} comment={comment} />
                  ))}
          </div>
         <MapCardActions className = "card-actions"/>
          <Divider/>

          <div className = "post-comment">
              {loggedIn ? (
                        <Paper
                            component="form"
                            sx={{
                                p: '20px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 350,
                                borderRadius: 2, // Ensures no rounded corners
                                boxShadow: 'none', // Removes box-shadow
                            }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Post a comment"
                                inputProps={{ 'aria-label': 'Post a comment' }}
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                            />
                            <IconButton
                                variant="contained"
                                sx={{ backgroundColor: 'var(--main-color)', '&:hover': 'var(--dark-color)' }}
                                onClick={handleAddComment}>
                                <SendIcon/>
                            </IconButton>

                        </Paper>
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
    </Modal>
  );
};

export default View;
