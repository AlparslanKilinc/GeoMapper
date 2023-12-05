import React from 'react';
import {useSelector} from "react-redux";
import SymbolMapLegend from './SymbolMapLegend.jsx'
import ChoroplethMapLegend from './ChoroplethMapLegend'
import DotDensityLegend from './DotDensityLegend.jsx'

export default function LegendWrapper({properties}) {
    const mapType = useSelector((state) => state.mapMetadata.mapGraphicsType)

    switch(mapType){
        case "Symbol Map":
            return <SymbolMapLegend properties = {properties}/>;
        case "Choropleth Map":
            return <ChoroplethMapLegend properties = {properties}/>;
        case "Dot Density Map":
            return <DotDensityLegend properties = {properties}/>
        case "Spike Map":
            return <SymbolMapLegend properties = {properties}/>;
        default:
            return <ChoroplethMapLegend properties = {properties}/>;
    }

}