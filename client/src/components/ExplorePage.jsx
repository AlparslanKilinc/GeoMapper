import React, {useState} from 'react';
import '../styles/explorePage.css'
import MapCard from './MapCard'
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from '@mui/material/Autocomplete';
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Popover from '@mui/material/Popover';
import Typography from "@mui/material/Typography";
import MenuList from '@mui/material/MenuList';
import CopyRight from "./CopyRight.jsx";



export default function ExplorePage({theme}) {
    console.log(theme.themeName)
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchor, setFilterAnchor] = useState(null)
  const isSortOpen = Boolean(anchorEl);
  const isFilterOpen = Boolean(filterAnchor);
  const tags = [
    {name: 'u.s.a', id: 1},
    {name: 'choropleth', id: 2},
    {name: 'america', id: 3},
    {name: 'election', id : 4}
  ];

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleSortMenuClose = () => {
    setAnchorEl(null)
  }

  const handleFilterMenuOpen = (event) => {
    setFilterAnchor(event.currentTarget);
  }

  const handleFilterMenuClose = () => {
    setFilterAnchor(null)
  }
  const handleSearchBar = () =>{

  }
  return (
      <div className = "explore-page">
        <Typography className = "explore-title" sx = {{fontSize: '30px'}}>Explore</Typography>
        <div className = "filter-sort-buttons">
          <div className = "filter"><Button
              variant = "contained"
              onClick={handleFilterMenuOpen}
              className = "explore-buttons"
          >Filter</Button>
          </div>
          <div className = "sort">
            <Button
                variant = "contained"
                className = "explore-buttons"
                onClick={handleSortMenuOpen}>
                Sort
            </Button>
          </div>
        </div>
        <div className = "map-card-container">
          <div className = "MapCard">
            <MapCard theme = {theme}></MapCard>
          </div>
          <div className = "MapCard">
            <MapCard theme = {theme}></MapCard>
          </div>
          <div className = "MapCard">
            <MapCard theme = {theme}></MapCard>
          </div>
            <div className = "MapCard">
                <MapCard theme = {theme}></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard theme = {theme}></MapCard>
            </div>

        </div>
          <div className='sort-menu'>
              <Menu anchorEl={anchorEl} open={isSortOpen} onClose={handleSortMenuClose}>
                  <MenuList>
                  <MenuItem className='newest'onClick={handleSortMenuClose}>
                      Newest
                  </MenuItem>
                  <MenuItem className='oldest' onClick={handleSortMenuClose}>
                      Oldest
                  </MenuItem>
                  <MenuItem className='most-likes' onClick={handleSortMenuClose}>
                      Most Likes
                  </MenuItem>
                  <MenuItem className='least-likes' onClick={handleSortMenuClose}>
                      Least Likes
                  </MenuItem>
                </MenuList>
              </Menu>
          </div>

        <Popover
            open={isFilterOpen}
            anchorEl={filterAnchor}
            onClose={handleFilterMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left', // Adjust this to align with the left of the button
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left', // Adjust this to align with the left of the button
            }}
        >
          <div style={{ padding: '10px' }} >
            <Autocomplete
                multiple
                id="tags"
                options={tags}
                getOptionLabel={(tag) => tag.name}
                default={[tags[2]]}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Tags"
                        placeholder="Select Tags"

                    />
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
          <CopyRight theme = {theme}/>
      </div>
  );
}