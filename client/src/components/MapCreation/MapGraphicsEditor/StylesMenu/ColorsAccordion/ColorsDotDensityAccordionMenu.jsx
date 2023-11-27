import React from 'react';

import { Slider, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../SubMenuTitle';
import { MuiColorInput } from 'mui-color-input';
export default function ColorsDotDensityAccordionMenu() {
  const [color, setColor] = React.useState('green');

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="select color" />
        <MuiColorInput format="hex" value={color} onChange={setColor} style={{ width: '100%' }} />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="opacity" />
        <Slider />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <SubMenuTitle title="dot value" />
        <TextField type="number" defaultValue={3} fullWidth />
      </Box>
    </Box>
  );
}
