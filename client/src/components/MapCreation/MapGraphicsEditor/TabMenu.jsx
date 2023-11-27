import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      // TODO: Trying to find a better solution to the overflow issue.
      style={{
        maxHeight: '400px'
      }}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div >
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function TabMenu({ tabsConfig, handleTabularOpen }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    // TODO: Use enum
    if (tabsConfig[newValue].label === 'Tabular') {
      handleTabularOpen(true);
    } else if (tabsConfig[newValue].label === 'Region') {
      handleTabularOpen(false);
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          TabIndicatorProps={{ style: { background: '#40E0D0' } }}
          // textColor="#40E0D0"
          value={value}
          onChange={handleChange}
          centered
        >
          {tabsConfig.map((tab, index) => (
            <Tab label={tab.label} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
      </Box>
      {tabsConfig.map((tab, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

TabMenu.propTypes = {
  tabsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired
    })
  ).isRequired
};
