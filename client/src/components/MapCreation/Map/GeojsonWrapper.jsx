import React, { useRef, useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { setSelectedRegionIdx } from '../../../redux-slices/mapGraphicsDataSlice';
import { useDispatch } from 'react-redux';
import '../../../styles/map-label.css';
// import leaflet css
import 'leaflet/dist/leaflet.css';
import LabelLayer from './layers/LabelLayer';
import { addLabelPosition, resetLabels } from '../../../redux-slices/mapStylesSlice';

export default function GeojsonWrapper({ isStyled }) {
  const dispatch = useDispatch();
  const map = useMap();
  const geojsonLayer = useRef();

  // Selectors
  const geoJSON = useSelector((state) => state.geojson.geojson.geoJSON);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const nameByProperty = useSelector((state) => state.mapGraphics.nameByProperty);
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);
  const isLabelVisible = useSelector((state) => state.mapGraphics.isLabelVisible);
  const labels = useSelector((state) => state.mapStyles.labels);
  const colors = useSelector((state) => state.mapStyles.colors);
  const continousColorScale = useSelector((state) => state.mapStyles.continousColorScale);
  const borderColor = useSelector((state) => state.mapStyles.borderColor);
  const borderWidth = useSelector((state) => state.mapStyles.borderWidth);
  const opacity = useSelector((state) => state.mapStyles.opacity);
  const fillColor = useSelector((state) => state.mapStyles.fillColor);
  const uniqueKey = [
    JSON.stringify(geoJSON),
    mapGraphicsType,
    JSON.stringify(regions),
    colorByProperty,
    nameByProperty,
    labelByProperty,
    isLabelVisible,
    JSON.stringify(colors),
    JSON.stringify(continousColorScale),
    borderColor,
    borderWidth,
    opacity,
    fillColor
  ].join('|');

  // // Default Styles
  // const defaultStyles = {
  //   color: 'black',
  //   weight: 1
  // };

  const defaultStyles = {
    fillColor: '#EDEDED',
    weight: 2,
    color: '#808080',
    fillOpacity: 1
  };

  if (isStyled) {
    defaultStyles.color = borderColor;
    defaultStyles.weight = borderWidth;
    defaultStyles.fillColor = fillColor;
  }

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor.padStart(6, '0');
  };

  const onEachFeature = (feature, layer) => {
    if (isStyled) {
      let regionData = regions[feature.properties.regionIdx];

      switch (mapGraphicsType) {
        case 'Choropleth Map':
          applyChoroplethStyles(feature, layer, regionData);
          break;
        // Add cases for other map types here

        case 'Dot Density Map':
          layer.setStyle(defaultStyles);
          layer.on({
            click: (e) => {
              dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
            }
          });
          break;

        case 'Heat Map':
          applyHeatMapStyles(feature, layer, regionData);
          break;

        default:
          // Default behavior if no specific map type is matched
          layer.setStyle(defaultStyles);
          break;
      }
      const { lat, lng } = layer.getBounds().getCenter();
      // check if labels length is not zero
      if (labelByProperty && labels.length <= feature.properties.regionIdx) {
        dispatch(addLabelPosition([lat, lng]));
      }
    } else {
      layer.setStyle(defaultStyles);
    }
  };

  const applyHeatMapStyles = (feature, layer, regionData) => {
    let colorPropVal = regionData[colorByProperty];
    let color = continousColorScale[feature.properties.regionIdx];

    layer.setStyle({
      fillColor: color,
      fillOpacity: opacity,
      weight: borderWidth,
      color: borderColor
    });

    const hoverStyle = {
      fillOpacity: 0.7
    };

    layer.on({
      click: (e) => {
        dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
      },
      mouseover: (e) => {
        layer.setStyle(hoverStyle);
      },
      mouseout: (e) => {
        layer.setStyle({
          fillColor: color,
          fillOpacity: opacity,
          weight: borderWidth,
          color: borderColor
        });
      }
    });
  };

  const applyChoroplethStyles = (feature, layer, regionData) => {
    let color = generateRandomColor();
    let colorPropVal = regionData[colorByProperty];
    let colorObj = colors.find((color) => color.name === colorPropVal);
    if (colorObj) color = colorObj.color;

    layer.setStyle({
      fillColor: color,
      fillOpacity: opacity,
      weight: borderWidth,
      color: borderColor
    });

    const hoverStyle = {
      fillOpacity: 0.7
    };

    layer.on({
      click: (e) => {
        dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
      },
      mouseover: (e) => {
        layer.setStyle(hoverStyle);
      },
      mouseout: (e) => {
        layer.setStyle({
          fillColor: color,
          fillOpacity: opacity,
          weight: borderWidth,
          color: borderColor
        });
      }
    });
  };

  useEffect(() => {
    if (geojsonLayer.current) {
      map.fitBounds(geojsonLayer.current.getBounds());
      dispatch(resetLabels());
    }
    // reset label positions
  }, [geoJSON]);

  const renderLabels = isStyled && geoJSON && labelByProperty;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {geoJSON && (
        <GeoJSON data={geoJSON} onEachFeature={onEachFeature} ref={geojsonLayer} key={uniqueKey} />
      )}

      {renderLabels && <LabelLayer />}
    </div>
  );
}
