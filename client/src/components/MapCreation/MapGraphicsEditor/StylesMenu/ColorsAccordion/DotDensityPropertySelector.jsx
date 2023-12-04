import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../SubMenuTitle';
import { useSelector, useDispatch } from 'react-redux';
import { changeXByProperty } from '../../../../../redux-slices/mapGraphicsDataSlice';
export default function DotDensityPropertySelector({ hideTitle }) {
  const dispatch = useDispatch();
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);
  

  // filter numerical properties from the propertyNames
  const dotDensityByPropertyOptions = propertyNames.filter((property) => {
    return columnTypes[property] === 'number';
  });

  const handleChangeDotDensityByProperty = (event, newValue) => {
    dispatch(changeXByProperty({ property: 'dotDensityByProperty', propertyBy: newValue }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 2 }}
    >
      {!hideTitle && <SubMenuTitle title="dot density properties" />}
      <Autocomplete
        multiple
        fullWidth
        id="tags-standard"
        options={dotDensityByPropertyOptions}
        value={dotDensityByProperty}
        onChange={handleChangeDotDensityByProperty}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder="dot density" />
        )}
      />
    </Box>
  );
}
