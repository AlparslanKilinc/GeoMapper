import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { getMapGraphicsDataById } from '../../redux-slices/mapGraphicsDataSlice.js';
import { getMapStylesDataById } from '../../redux-slices/mapStylesSlice.js';
import { getMapMetaDataById } from '../../redux-slices/mapMetadataSlice.js';
import { fetchGeojsonById } from '../../redux-slices/geoJSONSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import View from '../MapView/View.jsx';
import MapCardActions from '../MapCardActions.jsx'
export default function MapCard({ map }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);
  const {
    title,
    description,
    tags,
    author,
    likes,
    forks,
    thumbnailUrl,
    authorUserName,
    publishDate,
    _id,
    graphicsDataId,
    stylesDataId,
    geoDataId
  } = map;

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleMapClick = async () => {
    const draft = publishDate === null;
    if (draft) {
      try {
        const mapGeoData = await dispatch(fetchGeojsonById(geoDataId));
        const mapGraphicsData = await dispatch(getMapGraphicsDataById(graphicsDataId));
        const mapStylesData = await dispatch(getMapStylesDataById(stylesDataId));
        const mapMetaData = await dispatch(getMapMetaDataById(_id));
        // After all promises have resolved, navigate to the desired route
        navigate('/mapCreation/GraphicsEditor');
      } catch (error) {
        // Handle any errors that might occur during the dispatch
        console.error('Error loading map data:', error);
      }
    } else {
      setOpenView(true);
    }
  };




  return (
    <div className="mapCard">
      <Card sx={{ maxWidth: 300, height: 350 }}>
        <CardActionArea onClick={handleMapClick}>
          <CardMedia component="img" height="200" image={thumbnailUrl} alt="green iguana" />
          <CardContent>
            <Link
              href="ExplorePage#"
              underline="hover"
              sx={{ color: 'var(--dark-color)', fontSize: '10px' }}
            >
              {authorUserName}
            </Link>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography variant="h8" component="div">
              {description}
            </Typography>
          </CardContent>
          <div className="tags">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant="outlined"
                size="small"
              />
            ))}
          </div>
        </CardActionArea>
        <MapCardActions/>
      </Card>
      <View map={map} open={openView} onClose={handleCloseView} />
    </div>
  );
}
