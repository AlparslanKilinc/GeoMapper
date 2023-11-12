import React, {useState} from 'react';
import '../styles/explorePage.css'
import MapCard from './MapCard.jsx'
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from '@mui/material/Autocomplete';
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Popover from '@mui/material/Popover';



export default function ExplorePage() {
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
    return (
      <div className = "explorePage">
        <div className = "heading"><h1>Explore</h1></div>
        <div className = "buttons">
          <div className = "filter"><Button
              variant = "contained"
              onClick={handleFilterMenuOpen}
              sx = {{backgroundColor : 'var(--main-color)',
                    '&:hover': {backgroundColor: 'var(--dark-color)'}}}
          >Filter</Button>
          </div>
          <div className = "sort">
              <Button
                  variant = "contained"
                  onClick={handleSortMenuOpen}
                  sx = {{backgroundColor : 'var(--main-color)',
                          '&:hover': {backgroundColor: 'var(--dark-color)'
                  }}}>Sort
              </Button>
          </div>
        </div>
        <div className = "content">
            <div className = "MapCard">
            <MapCard></MapCard>
          </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
            <div className = "MapCard">
                <MapCard></MapCard>
            </div>
        </div>


          <Menu anchorEl={anchorEl}
                open={isSortOpen}
                onClose={handleSortMenuClose}>
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
                  horizontal: 'left', // Adjust this to align with the left of the button
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left', // Adjust this to align with the left of the button
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





      </div>
  );
}
