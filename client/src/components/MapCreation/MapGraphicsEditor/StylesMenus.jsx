import React from 'react';
import Box from '@mui/material/Box';
import ColorsAccordionMenu from './ColorsAccordionMenu';
import ShapeAccordionMenu from './ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';
import { useSelector } from 'react-redux';

export default function StylesMenus() {
  const SYMBOL_MAP = 'Symbol Map';
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata.mapGraphicsType);
  return (
    <div>
      <ColorsAccordionMenu />

      {mapGraphicsType === SYMBOL_MAP && <ShapeAccordionMenu />}
      <BorderAccordionMenu />
    </div>
  );
}
