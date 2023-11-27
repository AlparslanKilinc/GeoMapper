import React from 'react';
import ColorsAccordionMenu from './ColorsAccordion/ColorsAccordionMenu';
import ShapeAccordionMenu from './Shapes/ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';
import MapStyleAccordionMenu from './MapStyleAccordionMenu';
import LabelsAccordionMenu from './LabelsAccordionMenu';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';

export default function StylesMenus() {
  const SYMBOL_MAP = 'Symbol Map';
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata.mapGraphicsType);

  const dividerStyle = {
    borderColor: 'black',
    borderBottomWidth: '1.2px',
  };

  return (
    <div>
      <ColorsAccordionMenu />
      <Divider sx={dividerStyle} />
      {mapGraphicsType === SYMBOL_MAP && (
        <>
          <ShapeAccordionMenu />
          <Divider sx={dividerStyle} />
        </>
      )}
      <BorderAccordionMenu />
      <Divider sx={dividerStyle} />
      <LabelsAccordionMenu />
      <Divider sx={dividerStyle} />
      <MapStyleAccordionMenu />
      <Divider sx={dividerStyle} />
    </div>
  );
}
