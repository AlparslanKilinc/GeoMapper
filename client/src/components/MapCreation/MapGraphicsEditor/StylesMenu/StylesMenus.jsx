import React from 'react';
import ColorsAccordionMenu from './ColorsAccordion/ColorsAccordionMenu';
import ShapeAccordionMenu from './Shapes/ShapeAccordionMenu';
import BorderAccordionMenu from './BorderAccordionMenu';
import MapStyleAccordionMenu from './MapStyleAccordionMenu';
import LabelsAccordionMenu from './LabelsAccordionMenu';
import LegendAccordionMenu from "./LegendAccordionMenu.jsx";
import { useSelector } from 'react-redux';

export default function StylesMenus() {
  const SYMBOL_MAP = 'Symbol Map';
  const CHORO_MAP = 'Choropleth Map';
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

  return (
    <div>
      <ColorsAccordionMenu />
      {mapGraphicsType !== CHORO_MAP && <ShapeAccordionMenu />}
      <BorderAccordionMenu />
      <LabelsAccordionMenu />
      <MapStyleAccordionMenu />
        <LegendAccordionMenu/>
    </div>
  );
}
