import React, { useEffect, useState } from 'react';
import MapCard from '../../Explore/MapCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDrafts } from '../../../redux-slices/mapSlice';
import { CircularProgress, Typography, Button } from '@mui/material';

export default function Drafts() {
  const drafts = useSelector((state) => state.map.drafts);
  const user = useSelector((state) => state.auth.user);
  const isLoadingDrafts = useSelector((state) => state.map.isLoadingDrafts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDrafts());
  }, [user]);

  const itemsPerPage = 4; // Number of drafts to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const renderDrafts = () => {
    if (drafts && drafts.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const visibleDrafts = drafts.slice(startIndex, endIndex);

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {visibleDrafts.map((map) => (
            <MapCard key={map._id} map={map} isDraft={true} />
          ))}
        </div>
      );
    }
    return <Typography>Empty...</Typography>;
  };

  const totalPages = Math.ceil((drafts.length || 1) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {isLoadingDrafts ? <CircularProgress /> : renderDrafts()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          sx={{ mr: '5px' }}
        >
          {'<'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          {'>'}
        </Button>
      </div>
    </div>
  );
}
