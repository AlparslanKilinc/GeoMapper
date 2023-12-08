import React from 'react';
import ColorsAccordionMenu from './ColorsAccordion/ColorsAccordionMenu';
import ShapeAccordionMenu from './Shapes/ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';
import MapStyleAccordionMenu from './MapStyleAccordionMenu';
import LabelsAccordionMenu from './LabelsAccordionMenu';
import LegendAccordionMenu from '../Legend/LegendAccordionMenu.jsx';
import { useSelector } from 'react-redux';

export default function StylesMenus() {
  const SYMBOL_MAP = 'Symbol Map';
  const SPIKE_MAP = 'Spike Map';
  const DOT_DENSITY = 'Dot Density Map';
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  return (
    <div>
      <ColorsAccordionMenu />
      {(mapGraphicsType === SYMBOL_MAP ||
        mapGraphicsType === SPIKE_MAP ||
        mapGraphicsType === DOT_DENSITY) && <ShapeAccordionMenu />}
      <BorderAccordionMenu />
      <LabelsAccordionMenu />
      <MapStyleAccordionMenu />
      <LegendAccordionMenu />
    </div>
  );
}
