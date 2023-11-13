import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Chip from '@mui/material/Chip';
import { Link as RouterLink } from 'react-router-dom'


export default function MapCard({ showActions = true }) {
  const handleTagClick = () => {
    console.log('tag was clicked');
  };

  return (
    <div className="mapCard">
      <Card sx={{ maxWidth: 300 }}>
        <CardActionArea component={RouterLink} to={'/MapView'}>
          <CardMedia
            component="img"
            height="200"
            image="https://miro.medium.com/v2/resize:fit:1050/1*5zOJ6rjq1p5AER-3wo702A.png"
            alt="green iguana"
          />
          <CardContent>
            <Link
              href="ExplorePage#"
              underline="hover"
              sx={{ color: 'var(--dark-color)', fontSize: '10px' }}
            >
              @john123
            </Link>
            <Typography gutterBottom variant="h5">
              Election Results
            </Typography>
            <Typography variant="h8" component="div">
              This is my description of the most recent election results
            </Typography>
          </CardContent>
          <div className="tags">
            <Chip label="Chorpleth" sx={{ mb: 1, ml: 1 }} onClick={handleTagClick} />
            <Chip label="United States" sx={{ mb: 1, ml: 1 }} onClick={handleTagClick} />
            <Chip label="Election" sx={{ mb: 1, ml: 1 }} onClick={handleTagClick} />
            <Chip label="Map" sx={{ mb: 1, ml: 1 }} onClick={handleTagClick} />
          </div>
        </CardActionArea>
        {showActions &&(
        <CardActions>
          <IconButton>
            <ThumbUpOffAltIcon className="like" />
          </IconButton>
          <IconButton>
            <ShareIcon className="export" />
          </IconButton>
          <IconButton>
            <IosShareIcon className="share" />
          </IconButton>
          <IconButton>
            <BookmarkBorderIcon className="bookmarks" />
          </IconButton>
        </CardActions>)}
      </Card>
    </div>
  );
}
