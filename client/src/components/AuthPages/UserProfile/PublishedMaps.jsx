import React, { useEffect, useState } from 'react';
import MapCard from '../../Explore/MapCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPublishedMaps } from '../../../redux-slices/mapSlice';
import { CircularProgress, Typography, Button } from '@mui/material';

export default function PublishedMaps() {
  const publishedMaps = useSelector((state) => state.map.publishedMaps);
  const user = useSelector((state) => state.auth.user);
  const isLoadingPublishedMaps = useSelector((state) => state.map.isLoadingPublishedMaps);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPublishedMaps());
  }, [user]);

  const itemsPerPage = 4; // Number of maps to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const renderPublishedMaps = () => {
    if (publishedMaps && publishedMaps.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const visiblePublishedMaps = publishedMaps.slice(startIndex, endIndex);

      return visiblePublishedMaps.map((map) => (
        <MapCard key={map._id} map={map} isDraft={false} isBookmark = {false}/>
      ));
    }
    return <Typography>Empty...</Typography>;
  };

  const totalPages = Math.ceil((publishedMaps.length || 1) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {isLoadingPublishedMaps ? <CircularProgress /> : renderPublishedMaps()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button
          variant="outlined"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          sx = {{mr: '5px'}}
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
