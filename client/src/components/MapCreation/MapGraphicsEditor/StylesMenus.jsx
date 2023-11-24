import React from 'react';
import Box from '@mui/material/Box';
import ColorsAccordionMenu from './ColorsAccordionMenu';
import ShapeAccordionMenu from './ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';

export default function StylesMenus({theme}) {
  return (
    <div className = "style-menu">
      <ColorsAccordionMenu theme = {theme} />
      <ShapeAccordionMenu theme = {theme} />
      <BorderAccordionMenu theme = {theme} />
    </div>
  );
}
