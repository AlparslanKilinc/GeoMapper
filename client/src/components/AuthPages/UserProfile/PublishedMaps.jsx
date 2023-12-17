import React, { useEffect } from 'react';
import MapCard from '../../Explore/MapCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPublishedMaps } from '../../../redux-slices/mapSlice';
import { CircularProgress, Typography } from '@mui/material';

export default function PublishedMaps() {
  const publishedMaps = useSelector((state) => state.map.publishedMaps);
  const user = useSelector((state) => state.auth.user);
  const isLoadingPublishedMaps = useSelector((state) => state.map.isLoadingPublishedMaps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPublishedMaps());
  }, [user]);

  const renderPublishedMaps = () => {
    if (publishedMaps && publishedMaps.length > 0) {
      return publishedMaps.map((map) => <MapCard key={map._id} map={map} isDraft = {false}/>);
    }
    return <Typography>Empty...</Typography>;
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
    {isLoadingPublishedMaps ? <CircularProgress /> : renderPublishedMaps()}
  </div>
  );
}
