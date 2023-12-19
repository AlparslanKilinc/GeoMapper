import { useDispatch, useSelector } from 'react-redux';
import MapCard from '../../Explore/MapCard.jsx';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {getBookmarkedMaps} from '../../../redux-slices/exploreSearchSlice'


export default function Bookmarks(){
  const bookmarks = useSelector((state) => state.exploreSearch.bookmarkedMaps);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.exploreSearch.isLoading);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getBookmarkedMaps(user.id));
  }, [user]);

  const itemsPerPage = 4; // Number of drafts to display per page
  const [currentPage, setCurrentPage] = useState(0);

  const renderBookmarks= () => {
    if (bookmarks && bookmarks.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const visibleBookmarks = bookmarks.slice(startIndex, endIndex);

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {visibleBookmarks.map((map) => (
            <MapCard key={map._id} map={map} isDraft={true} isBookmark = {true} />
          ))}
        </div>
      );
    }
    return <Typography>Empty...</Typography>;
  }
  const totalPages = bookmarks ? Math.ceil((bookmarks.length || 1) / itemsPerPage): 1;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {isLoading ? <CircularProgress /> : renderBookmarks()}
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

};
