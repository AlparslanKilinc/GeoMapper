import React, { useEffect } from 'react';
import MapCard from '../../Explore/MapCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrafts } from '../../../redux-slices/mapSlice';
import { CircularProgress } from '@mui/material';

export default function Drafts() {
  const drafts = useSelector((state) => state.map.drafts);
  const user = useSelector((state) => state.auth.user);
  const isLoadingDrafts = useSelector((state) => state.map.isLoadingDrafts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrafts());
  }, [user]);

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {isLoadingDrafts ? (
        <CircularProgress />
      ) : (
        <>{drafts.length >0 ? drafts.map((map) => <MapCard key={map._id} map={map} />) : <Typography>
          Empty...</Typography>}</>
      )}
    </div>
  );
}
