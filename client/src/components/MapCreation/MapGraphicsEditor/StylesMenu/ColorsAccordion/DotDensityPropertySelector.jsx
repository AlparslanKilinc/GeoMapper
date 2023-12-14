import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import SubMenuTitle from '../../SubMenuTitle';
import { useSelector, useDispatch } from 'react-redux';
import { changeXByProperty, TableValidation } from '../../../../../redux-slices/mapGraphicsDataSlice';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';

export default function DotDensityPropertySelector({ hideTitle }) {
  const dispatch = useDispatch();
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const dotDensityByProperty = useSelector((state) => state.mapGraphics.dotDensityByProperty);
  const propertyNames = useSelector((state) => state.mapGraphics.propertyNames);
  const columnTypes = useSelector((state) => state.mapGraphics.columnTypes);
  const columnValidationErrors = useSelector((state) => state.mapGraphics.columnValidationErrors);
  // filter numerical properties from the propertyNames
  const dotDensityByPropertyOptions = propertyNames.filter((property) => {
    return columnTypes[property] === 'number' && !columnValidationErrors[property];
  });

  const handleChangeDotDensityByProperty = (event, newValue) => {
    dispatch(addActionToPast({
      undoActions: [{ actionCreator: changeXByProperty, args: [{ property: 'dotDensityByProperty', propertyBy: dotDensityByProperty }] },
      { actionCreator: TableValidation, args: [mapGraphicsType] }],
      redoActions: [{ actionCreator: changeXByProperty, args: [{ property: 'dotDensityByProperty', propertyBy: newValue }] },
      { actionCreator: TableValidation, args: [mapGraphicsType] }]
    }));
    dispatch(changeXByProperty({ property: 'dotDensityByProperty', propertyBy: newValue }));
    dispatch(TableValidation(mapGraphicsType));
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
