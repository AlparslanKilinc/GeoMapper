import React from 'react';
import Box from '@mui/material/Box';
import ColorsAccordionMenu from './ColorsAccordionMenu';
import ShapeAccordionMenu from './ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';
import LegendAccordionMenu from "./LegendAccordionMenu.jsx";

export default function StylesMenus() {
  return (
    <div>
      <ColorsAccordionMenu />
      <ShapeAccordionMenu />
      <BorderAccordionMenu />
        <LegendAccordionMenu/>
    </div>
  );
}
