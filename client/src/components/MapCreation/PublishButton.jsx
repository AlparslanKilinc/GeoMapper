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
import { getAllTags } from '../../redux-slices/exploreSearchSlice'
import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';

export default function PublishButton({ buttonStyle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearStatesComplete } = useClearStates();
  const [isModalOpen, setModalOpen] = useState(false);
  const title = useSelector((state) => state.mapMetadata.title)
  const mapType = useSelector((state) => state.mapMetadata.mapGraphicsType)
  const description = useSelector((state) => state.mapMetadata.description)
  const allTags = useSelector((state) => state.exploreSearch.allTags)
  const [mapTitle, setMapName] = useState(title);
  const [mapDescription, setDescription] = useState(description);
  const [tags, setTags] = useState([mapType]);
  const [tagInput, setTagInput] = useState('');
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
    console.log(allTags)
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
      const dateString = date.toLocaleDateString('en-US');
      await dispatch(setTagsSlice(tags))
      await dispatch(setPublishedDate(dateString));
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
      <Dialog open={isModalOpen} onClose={handleCloseModal} >
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

          {/*<TextField
          label="Tags"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          fullWidth
        />
        <Box mt={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleDeleteTag(tag)}
              variant="outlined"
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>*/}
          <Button onClick={handlePublishMap} variant="contained">Publish</Button>
          <Button onClick={handleCloseModal}>Cancel</Button>
        </DialogContent>

      </Dialog>

    </div>

  );
}
