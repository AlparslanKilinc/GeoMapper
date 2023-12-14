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

  console.log('publishedMaps:', publishedMaps);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {isLoadingPublishedMaps ? (
        <CircularProgress />
      ) : (
        <>{publishedMaps.length >0 ? publishedMaps.map((map) => <MapCard key={map._id} map={map} />) : <Typography>
          Empty...</Typography>}</>
      )}
    </div>
  );
}
