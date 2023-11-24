import React, { useState } from 'react';
import { Drawer, Tabs, Tab, Box, Typography } from '@mui/material';

const drawerWidth = 240;

const MapGraphicsToolbox = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%',  }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            height: '100%', // make Drawer height 100% of the container
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="map graphics toolbox tabs"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="🖌️ Annotate" />
          <Tab label="🎨 Styles" />
          {/* Add more tabs as needed */}
        </Tabs>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedTab === 0 && (
          // Content for Annotate tools
          <Typography variant="h6" gutterBottom>
            Annotation Tools
          </Typography>
          // ... more content
        )}

        {selectedTab === 1 && (
          // Content for Styles tools
          <Typography variant="h6" gutterBottom>
            Style Tools
          </Typography>
          // ... more content
        )}

        {/* Additional content for other tabs can be added here */}
      </Box>
    </Box>
  );
};

export default MapGraphicsToolbox;
