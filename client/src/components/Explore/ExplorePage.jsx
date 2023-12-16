import React, {useEffect, useRef, useState} from 'react';
import '../../styles/explorePage.css';
import MapCard from './MapCard';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import CopyRight from '../Landing/CopyRight';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllPublishedMaps} from '../../redux-slices/mapSlice'
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";

export default function ExplorePage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const dispatch = useDispatch();
  const isSortOpen = Boolean(anchorEl);
  const isFilterOpen = Boolean(filterAnchor);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Set your desired page size
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(null);
    const maps = useSelector((state) => state.map.publishedMaps)
    console.log(maps)

    const isLoadingMaps = useSelector((state) => state.map.isLoadingPublishedMaps);
  const tags = [
    { name: 'u.s.a', id: 1 },
    { name: 'choropleth', id: 2 },
    { name: 'america', id: 3 },
    { name: 'election', id: 4 }
  ];

    useEffect(() => {
        dispatch(fetchAllPublishedMaps({ page: currentPage, pageSize }));
    }, [currentPage, pageSize, dispatch]);

    useEffect(() => {
        const fetchMoreMaps = async () => {
            if (!isLoadingMaps && hasMore) {
                const lastMapCard = document.querySelector('.map-card-container > :last-child');
                if (lastMapCard) {
                    const rect = lastMapCard.getBoundingClientRect();
                    if (rect.bottom <= window.innerHeight) {
                        // Last map card is visible, fetch more maps
                        console.log('Loading more maps...');
                        setCurrentPage((prev) => prev + 1);
                    }
                }
            }
        };

        observer.current = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    fetchMoreMaps();
                }
            },
            { threshold: 0.5 } // Adjust the threshold as needed
        );

        const lastMapCard = document.querySelector('.map-card-container > :last-child');
        if (lastMapCard) {
            observer.current.observe(lastMapCard);
        }

        return () => observer.current?.disconnect();
    }, [isLoadingMaps, hasMore]);

  const handleSortMenuOpen = (event) => {
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




    const renderMaps = () => {
        if (maps && maps.length > 0) {
            return maps.map((map) => <MapCard key={map._id} map={map} />);
        }
        return <Typography>Empty...</Typography>;
    };

        const handleSearchBar = () => {};
  return (
    <div className="explorePage">
      <div className="explore-title">
        <h1>Explore</h1>
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
            {hasMore && <div ref={observer}></div>}
        </div>

      <Menu anchorEl={anchorEl} open={isSortOpen} onClose={handleSortMenuClose}>
        <MenuItem onClick={handleSortMenuClose}>Newest</MenuItem>
        <MenuItem onClick={handleSortMenuClose}>Oldest</MenuItem>
        <MenuItem onClick={handleSortMenuClose}>Most Likes</MenuItem>
        <MenuItem onClick={handleSortMenuClose}>Least Likes</MenuItem>
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
