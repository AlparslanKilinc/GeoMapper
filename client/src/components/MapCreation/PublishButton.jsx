import React, { useEffect, useState } from 'react';
import { setPublishedDate, publishMap, setTagsSlice } from '../../redux-slices/mapMetadataSlice';
import { useDispatch, useSelector } from 'react-redux';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useClearStates } from '../MapCreation/useClearStates';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { getAllTags } from '../../redux-slices/exploreSearchSlice';
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import { fetchGeojsonById } from '../../redux-slices/geoJSONSlice';
import { getMapStylesDataById } from '../../redux-slices/mapStylesSlice';
import { getMapMetaDataById } from '../../redux-slices/mapMetadataSlice';
import { getMapGraphicsDataById} from '../../redux-slices/mapGraphicsDataSlice';
import { useSaveMap } from './useSaveMap';

export default function PublishButton({ buttonStyle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mapData = useSelector((state) => state.mapMetadata);
  const { clearStatesComplete } = useClearStates();
  const [isModalOpen, setModalOpen] = useState(false);
  const title = useSelector((state) => state.mapMetadata.title);
  const mapType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const description = useSelector((state) => state.mapMetadata.description);
  const allTags = useSelector((state) => state.exploreSearch.allTags);
  const [mapTitle, setMapName] = useState(title);
  const [mapDescription, setDescription] = useState(description);
  const [tags, setTags] = useState([mapType]);
  const [tagInput, setTagInput] = useState('');
  const { updateMapData } = useSaveMap();
  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && tags.length <= 5 && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleOpenModal = async () => {
    await dispatch(getAllTags());
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleTitleChange = (event) => {
    setMapName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePublishMap = async () => {
    try {
      const date = new Date();
      const dateString = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
      });
      const timeString = date.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      });
      
      const dateTimeString = dateString + ' ' + timeString;
     
      await dispatch(setTagsSlice(tags));
      await dispatch(setPublishedDate(dateTimeString));
      await updateMapData();
      await dispatch(publishMap());
      await clearStatesComplete();
      navigate('/profile');
    } catch (error) {
      console.error('Error publishing map:', error);
    }
  };

  return (
    <div>
      <Tooltip title="Publish">
        <Button sx={buttonStyle} onClick={handleOpenModal}>
          <PublishOutlinedIcon />
        </Button>
      </Tooltip>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Publish Map</DialogTitle>
        <DialogContent sx={{ maxHeight: 'none' }}>
          <TextField
            label="Map Title*"
            value={mapTitle}
            onChange={handleTitleChange}
            fullWidth
            mb={2}
            sx={{ mb: '20px', mt: '10px' }}
          />
          <TextField
            label="Description (Optional)"
            multiline
            rows={5}
            value={mapDescription}
            onChange={handleDescriptionChange}
            fullWidth
            mb={2}
            sx={{ mb: '10px' }}
          />
          <Autocomplete
            multiple
            id="tags"
            options={allTags}
            sx={{ mb: '10px' }}
            freeSolo
            value={tags}
            onChange={(event, newValue) => setTags(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                fullWidth
              />
            )}
          />
          <Button onClick={handlePublishMap} variant="contained">
            Publish
          </Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
