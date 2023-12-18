import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Comment({ comment }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start', marginBottom: 2 }}>
      <Avatar src={comment.authorProfilePicture} sx={{ marginRight: 2 }} />
      <Box sx={{ maxWidth: '100%' }}>
        {' '}
        {/* Set a maximum width */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          {comment.authorUsername}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: 'pre-line',
            wordBreak: 'break-word' // Enable text wrapping
          }}
        >
          {comment.text}
        </Typography>
      </Box>
    </Box>
  );
}
