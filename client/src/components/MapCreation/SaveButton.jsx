import React from 'react';
import { Button } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useSaveMap } from './useSaveMap';

export default function SaveButton() {
  const saveMapData = useSaveMap();
  return (
    <Button variant="outlined" aria-label="save" onClick={saveMapData}>
      <SaveOutlinedIcon />
    </Button>
  );
}
