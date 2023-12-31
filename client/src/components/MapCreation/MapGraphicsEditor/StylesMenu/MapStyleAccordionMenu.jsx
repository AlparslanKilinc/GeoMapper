import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { MuiColorInput } from 'mui-color-input';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeBackgroundColor,
  toggleTilelayerVisibility,
  setFillColor
} from '../../../../redux-slices/mapStylesSlice';
import { addActionToPast } from '../../../../redux-slices/undoRedoSlice';
import SubMenuTitle from '../SubMenuTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DebouncedColorInput from '../../../DebouncedElement/DebouncedColorInput';

export default function MapStyleAccordionMenu() {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const { mapBackgroundColor, isTilelayerVisible, fillColor } = useSelector(
    (state) => state.mapStyles
  );

  const handleBackgroundColorChange = (color) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeBackgroundColor, args: [mapBackgroundColor] }],
      redoActions: [{ actionCreator: changeBackgroundColor, args: [color] }]
    }));
    dispatch(changeBackgroundColor(color));
  };

  const handleFillColorChange = (color) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: setFillColor, args: [fillColor] }],
      redoActions: [{ actionCreator: setFillColor, args: [color] }]
    }));
    dispatch(setFillColor(color));
  };

  const handleTilelayerSwitchChange = () => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: toggleTilelayerVisibility, args: [] }],
      redoActions: [{ actionCreator: toggleTilelayerVisibility, args: [] }]
    }));
    dispatch(toggleTilelayerVisibility());
  };

  function rederMapFillColorInput() {
    if (mapGraphicsType === 'Choropleth Map' || mapGraphicsType === 'Heat Map') {
      return null;
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%' }}
      >
        <Typography variant="subtitle2">fill color</Typography>
        <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
        <DebouncedColorInput format="hex" value={fillColor} onChange={handleFillColorChange} />
      </Box>
    );
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
            <FormatColorFillIcon sx={{ mr: 0.5 }} /> map style
          </Box>
        </Typography>
        {/* Emoji included */}
      </AccordionSummary>
      <AccordionDetails>
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
            <Typography variant="subtitle2">background color</Typography>
            <Divider style={{ margin: '10px 0', width: '100%', height: 1 }} />
            <DebouncedColorInput
              format="hex"
              value={mapBackgroundColor}
              onChange={handleBackgroundColorChange}
            />
          </Box>

          {rederMapFillColorInput()}

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <SubMenuTitle title="tilelayer visibility" />
            <FormControlLabel
              key={String(isTilelayerVisible)}
              control={
                <Switch checked={isTilelayerVisible} onChange={handleTilelayerSwitchChange} />
              }
              label="Tilelayer"
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
