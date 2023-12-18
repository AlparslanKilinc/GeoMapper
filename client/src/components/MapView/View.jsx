import React, { useState } from 'react';
import '../../styles/view.css';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send.js';
import Comment from './Comment.jsx';
import { Divider, Box } from '@mui/material';
import MapCardActions from '../MapCardActions';
import { addComment } from '../../redux-slices/commentsSlice';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const View = ({ map, open, onClose }) => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [newCommentText, setNewCommentText] = useState('');
  const user = useSelector((state) => state.auth.user);
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
        date_posted: new Date().toISOString() // replace with actual date logic
      };
      setNewCommentText('');
      dispatch(addComment(newComment));
    }
  };
  return (
    <Modal open={open} onClose={onClose} className="view-background">
      <Card sx={{ display: 'flex', flexDirection: 'row', height: '80%', width: '80%' }}>
        <CardMedia
          sx={{ flex: '1 0 auto', width: 500 }}
          component="img"
          image={map.thumbnailUrl}
          alt="map"
        />
        <CardContent sx={{ padding: 0 }}>
          <Box display="flex" flexDirection="column" sx={{ height: '100%', width: '100%' }}>
            <Box pl={2} pt={2}>
              <Typography variant="h6">{map.title}</Typography>
              <Link
                href="ExplorePage#"
                underline="hover"
                sx={{ color: '#00666', fontSize: '10px' }}
              >
                {map.authorUserName}
              </Link>
              <Box>
                <Typography variant="caption">{map.description}</Typography>
              </Box>
            </Box>

            <Divider />
            <Box sx={{ flex: 1, maxWidth: '25ch' }} pl={2} pr={2} pt={2}>
              {comments.length === 0 ? (
                <Typography variant="body1" sx={{ color: 'lightgrey', ml: '25px' }}>
                  Be the first to add a comment!
                </Typography>
              ) : (
                comments.map((comment, index) => <Comment key={index} comment={comment} />)
              )}
            </Box>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <MapCardActions map={map} />
            <Box pl={2}>
              <Typography variant="subtitle2">{likes} likes</Typography>
            </Box>
            <Divider />
            <div className="post-comment">
              {loggedIn ? (
                <Paper
                  component="form"
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: 350,
                    boxShadow: 'none'
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, height: '20px' }}
                    placeholder="Post a comment"
                    inputProps={{ 'aria-label': 'Post a comment' }}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                  <IconButton variant="contained" onClick={handleAddComment} size="small">
                    <SendIcon />
                  </IconButton>
                </Paper>
              ) : (
                <p>
                  <a className="login-link" href="/login">
                    Login
                  </a>
                  to comment
                </p>
              )}
            </div>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default View;
