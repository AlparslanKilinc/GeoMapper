import React, { useEffect, useState } from 'react';
import '../../styles/explorePage.css';
import MapCard from './MapCard';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import {useDispatch, useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";
import {getAllPublishedMaps, search} from '../../redux-slices/exploreSearchSlice'
import Search from '../Explore/SearchBar'
export default function ExplorePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isSortOpen = Boolean(anchorEl);
  const maps = useSelector((state) => state.exploreSearch.publishedMaps)
  const isLoadingMaps = useSelector((state) => state.exploreSearch.isLoadingPublishedMaps);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(getAllPublishedMaps(sortBy));
  }, [sortBy]);


  const handleSortMenuOpen = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNewest = () => {
    setSortBy('newest');
    handleSortMenuClose();
  };

  const handleMostLiked = () => {
    setSortBy('mostLiked');
    handleSortMenuClose();
  };


  const handleOldest = () =>{
    setSortBy('oldest');
    handleSortMenuClose();
  }

  const handleLeastLiked = () =>{
    setSortBy('leastLiked');
    handleSortMenuClose();
  }

  const renderMaps = () => {
    if (maps && maps.length > 0) {
      return maps.map((map) => <MapCard key={map._id} map={map} isDraft={false} isBookmark = {true} />);
    }
    return <Typography>No Maps Found!</Typography>
  };
  const onSearch = (query) =>{
    if (query.trim() !== '') {
      console.log(query);
      dispatch(search(query));
    } else {
      dispatch(getAllPublishedMaps(sortBy));
    }
  }


  return (
    <div className="explorePage">
      <div className="explore-title">
        <Search className = "search" onSearch={onSearch}/>
      </div>
      <div className="filter-sort-buttons">
        <div className="sort">
          <Button
            variant="contained"
            onClick={handleSortMenuOpen}
            sx={{
              backgroundColor: 'var(--main-color)',
              '&:hover': { backgroundColor: 'var(--dark-color)' }
            }}
          >
            Sort
          </Button>

        </div>
      </div>
      <div className="map-card-container">
        {isLoadingMaps ? <CircularProgress /> : renderMaps()}
      </div>

      <Menu anchorEl={anchorEl} open={isSortOpen} onClose={handleSortMenuClose}>
        <MenuItem onClick={handleNewest}>Newest</MenuItem>
        <MenuItem onClick={handleOldest}>Oldest</MenuItem>
        <MenuItem onClick={handleMostLiked}>Most Likes</MenuItem>
        <MenuItem onClick={handleLeastLiked}>Least Likes</MenuItem>
      </Menu>

    </div>
  );
}

