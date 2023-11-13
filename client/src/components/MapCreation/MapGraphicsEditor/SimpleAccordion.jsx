import React from 'react';
import Box from '@mui/material/Box';
import ColorsAccordionMenu from './ColorsAccordionMenu';
import ShapeAccordionMenu from './ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';

export default function SimpleAccordion() {
  return (
    <div>
      <ColorsAccordionMenu />
      <ShapeAccordionMenu />
      <BorderAccordionMenu />
    </div>
  );
}
