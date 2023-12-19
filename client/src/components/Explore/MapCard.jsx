import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Modal} from '@mui/material';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import { getMapGraphicsDataById,deleteGraphicsDataById } from '../../redux-slices/mapGraphicsDataSlice.js';
import { getMapStylesDataById, deleteStylesDataById } from '../../redux-slices/mapStylesSlice.js';
import { getMapMetaDataById } from '../../redux-slices/mapMetadataSlice.js';
import { fetchGeojsonById } from '../../redux-slices/geoJSONSlice.js';
import {fetchDrafts, fetchUserPublishedMaps, removeMapFromUser, deleteMap} from '../../redux-slices/mapSlice'
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import View from '../MapView/View.jsx';
import MapCardActions from '../MapCardActions.jsx'
import {getMapComments} from "../../redux-slices/commentsSlice";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {getAllTaggedMaps} from '../../redux-slices/exploreSearchSlice';

export default function MapCard({ map, isDraft, isBookmark }) {
  const dispatch = useDispatch();
  const user = useSelector((state) =>state.auth.user)
  const navigate = useNavigate();
  const [openView, setOpenView] = useState(false);
  const [deleteModal, setOpenDeleteModal] = useState(false)
  const location = useLocation();
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

  const handleOpenDeleteModal = () =>{
    setOpenDeleteModal(true);
  }
  const handleCloseDeleteModal = () =>{
    setOpenDeleteModal(false);
  }
  const handleTagClick = (tag)=>{
    console.log(tag)
    dispatch(getAllTaggedMaps(tag))
  }
  const handleMapClick = async () => {
    const draft = publishDate === null;
    if (draft) {
      try {
        const mapGeoData = await dispatch(fetchGeojsonById(geoDataId));
        const mapGraphicsData = await dispatch(getMapGraphicsDataById(graphicsDataId));
        const mapStylesData = await dispatch(getMapStylesDataById(stylesDataId));
        const mapMetaData = await dispatch(getMapMetaDataById(_id));
        navigate('/mapCreation/GraphicsEditor');
      } catch (error) {
        console.error('Error loading map data:', error);
      }
    } else {
      setOpenView(true);
      dispatch(getMapComments(map._id))
    }
  };

  const handleDeleteMap = async() =>{
       const mapId = _id
       const userId = user.id
       await dispatch(removeMapFromUser( {mapId, userId} ));
       await dispatch(deleteGraphicsDataById(graphicsDataId));
       await dispatch(deleteStylesDataById(stylesDataId));
       await dispatch(deleteMap(_id))
       await dispatch(fetchDrafts())
       await dispatch(fetchUserPublishedMaps())
       handleCloseDeleteModal();
  }

  return (
    <div className="mapCard">
      <Card sx={{ width: 300, height: 400 }}>
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
          </CardContent>
        </CardActionArea>
        <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '-10px' }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="medium"
              style={{ margin: '4px' }}
              onClick={() => handleTagClick(tag)}
            />
          ))}
        </div>
        {(location.pathname === `/profile`) && (
            <IconButton
                onClick={handleOpenDeleteModal}
            >
              <DeleteOutlineIcon style={{ color: 'red' }} />
            </IconButton>
        )}
        {(!isDraft || isBookmark) && <MapCardActions map={map} isDraft={true} />}
      </Card>
      <View map={map} open={openView} onClose={handleCloseView} />
      <Modal open={deleteModal} onClose={handleCloseDeleteModal}>
        <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 170,
              height: 60,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 8
            }}
        >
          <Typography variant="h6" component="h2" sx={{ mt: '-50px', ml: '-50px', mb: '30px' }}>
            Are you sure you want to delete this map?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleDeleteMap}>
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
