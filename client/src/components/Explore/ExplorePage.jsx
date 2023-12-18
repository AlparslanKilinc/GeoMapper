import React, { useEffect, useLayoutEffect, useState } from 'react';
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
  const [filterAnchor, setFilterAnchor] = useState(null);
  const dispatch = useDispatch();
  const isSortOpen = Boolean(anchorEl);
  const isFilterOpen = Boolean(filterAnchor);
  const maps = useSelector((state) => state.exploreSearch.publishedMaps)
  const isLoadingMaps = useSelector((state) => state.exploreSearch.isLoadingPublishedMaps);
  const [sortBy, setSortBy] = useState('newest');

  const tags = [
    { name: 'u.s.a', id: 1 },
    { name: 'choropleth', id: 2 },
    { name: 'america', id: 3 },
    { name: 'election', id: 4 }
  ];
  useEffect(() => {
    dispatch(getAllPublishedMaps(sortBy));
  }, [sortBy]);


  const handleSortMenuOpen = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterMenuOpen = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchor(null);
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
    if (maps.length > 0) {
      return maps.map((map) => <MapCard key={map._id} map={map} isDraft={false} />);
    }
    return <Typography>No Maps Found!</Typography>
  };

  const onSearch = (query) =>{
    console.log(query)
    dispatch(search(query))
  }


  return (
    <div className="explorePage">
      <div className="explore-title">
        <Search className = "search" onSearch={onSearch}/>
      </div>
      <div className="filter-sort-buttons">
        <div className="filter">
          <Button
            variant="contained"
            onClick={handleFilterMenuOpen}
            sx={{
              backgroundColor: 'var(--main-color)',
              '&:hover': { backgroundColor: 'var(--dark-color)' }
            }}
          >
            Filter
          </Button>
        </div>
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

      <Popover
        open={isFilterOpen}
        anchorEl={filterAnchor}
        onClose={handleFilterMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left' // Adjust this to align with the left of the button
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left' // Adjust this to align with the left of the button
        }}
      >
        <div style={{ padding: '10px' }}>
          <Autocomplete
            multiple
            id="tags"
            options={tags}
            getOptionLabel={(tag) => tag.name}
            default={[tags[2]]}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Search Tags" placeholder="Select Tags" />
            )}
          />
          <div style={{ marginTop: '10px' }}>
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                clickable
                onClick={() => {
                  console.log(`Clicked on tag: ${tag.name}`);
                }}
                style={{ margin: '4px' }}
              />
            ))}
          </div>
        </div>
      </Popover>
    </div>
  );
}

