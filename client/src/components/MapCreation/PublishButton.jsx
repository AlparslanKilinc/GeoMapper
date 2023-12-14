import React from 'react';
import { setPublishedDate, publishMap } from '../../redux-slices/mapMetadataSlice';
import { useDispatch } from 'react-redux';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useClearStates } from '../MapCreation/useClearStates';

export default function PublishButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearStatesComplete } = useClearStates();

const handlePublishMap = async () => {
  try {
    const date = new Date();
    const dateString = date.toLocaleDateString('en-US');
    dispatch(setPublishedDate(dateString));
    await dispatch(publishMap());
    await clearStatesComplete();
    navigate('/profile');
  } catch (error) {
    console.error('Error publishing map:', error);
  }
};

return (
  <Button onClick={handlePublishMap}>
    <PublishOutlinedIcon />
  </Button>
);
}
