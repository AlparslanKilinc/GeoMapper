import React, {useState} from 'react';
import '../../styles/view.css';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send.js";
import Comment from "./Comment.jsx";
import {Divider} from "@mui/material";
import MapCardActions from '../MapCardActions'
import {addComment} from '../../redux-slices/commentsSlice'
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";

const View = ({ map, open, onClose }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [newCommentText, setNewCommentText] = useState('');
  const user = useSelector((state) => state.auth.user)
  const likes = useSelector((state) => state.mapMetadata.likes);
  const comments = useSelector((state) => state.comments.comments);
  const handleAddComment = () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        mapId: map._id,
        authorUserName: user.userName, // replace with actual author data
        authorProfilePicture: user.profilePicPath,
        authorId: user.id,
        text: newCommentText,
        date_posted: new Date().toISOString(), // replace with actual date logic
      };
      setNewCommentText('')
      dispatch(addComment(newComment));
    }
  };
  return (
    <Modal open={open} onClose={onClose} className="view-background">
      <div className="view-content" onClick={(e) => e.stopPropagation()}>
        <div className="view-left-pane">
          <img src={map.thumbnailUrl} alt="map" />
        </div>
        <div className="view-right-pane">
          <Typography variant = "h6" sx = {{mt: '-20px'}}>{map.title}</Typography>
          <Link href="ExplorePage#" underline="hover" sx={{ color: '#00666', fontSize: '10px' }}>
            {map.authorUserName}
          </Link>
          <Divider/>
          <div className="view-comment-section">
            {comments.length === 0 ? (
                <Typography variant = "body1" sx = {{color:'lightgrey', ml: '25px'}}>Be the first to add a comment!</Typography>
            ) : (
                comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))
            )}
          </div>
          <div className = "card-actions">
            <MapCardActions map = {map}/>
          </div>
          <Typography variant="subtitle2" >{likes} likes</Typography>
          <Typography variant="caption">{map.description}</Typography>
          <Divider/>
          <div className = "post-comment">
              {loggedIn ? (
                        <Paper
                            component="form"
                            sx={{
                                p: '20px 4px',
                                mb:'-20px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 350,
                                borderRadius: 2, // Ensures no rounded corners
                                boxShadow: 'none', // Removes box-shadow
                            }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1, height: '20px' }}
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
