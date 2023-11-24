import React from 'react';
import MapGraphicsEditor from './MapGraphicsEditor/MapGraphicsEditor';
import { ThemeProvider } from '@mui/material/styles';

export default function MapGraphicsEditing({theme}) {
  console.log(theme)
  return (
         <MapGraphicsEditor theme = {theme}/>
  );

}
