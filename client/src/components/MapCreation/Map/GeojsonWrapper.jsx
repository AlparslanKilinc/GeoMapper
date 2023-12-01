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
import { addLabelPosition } from '../../../redux-slices/mapStylesSlice';

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
  const colors = useSelector((state) => state.mapStyles.colors);
  const continousColorScale = useSelector((state) => state.mapStyles.continousColorScale);
  const borderColor = useSelector((state) => state.mapStyles.borderColor);
  const borderWidth = useSelector((state) => state.mapStyles.borderWidth);
  const opacity = useSelector((state) => state.mapStyles.opacity);
  const mapBackgroundColor = useSelector((state) => state.mapStyles.mapBackgroundColor);

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
    mapBackgroundColor
  ].join('|');

  // Default Styles
  const defaultStyles = {
    color: 'black',
    weight: 1
  };

  if (isStyled) {
    defaultStyles.color = borderColor;
    defaultStyles.weight = borderWidth;
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
          layer.on({
            click: (e) => {
              dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
            }
          });
          break;
        default:
          // Default behavior if no specific map type is matched
          break;
      }
      const { lat, lng } = layer.getBounds().getCenter();
      dispatch(addLabelPosition([lat, lng]));
    }
  };

  const applyChoroplethStyles = (feature, layer, regionData) => {
    let color = generateRandomColor();
    let colorPropVal = regionData[colorByProperty];
    if (!isNaN(colorPropVal)) {
      color = continousColorScale[feature.properties.regionIdx];
    } else {
      let colorObj = colors.find((color) => color.name === regionData[colorByProperty]);
      if (colorObj) color = colorObj.color;
    }

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
    }
  }, [geoJSON]);

  const renderLabels = isLabelVisible && isStyled && geoJSON;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {geoJSON && (
        <GeoJSON
          data={geoJSON}
          style={defaultStyles}
          onEachFeature={onEachFeature}
          ref={geojsonLayer}
          key={uniqueKey}
        />
      )}

      {renderLabels && <LabelLayer />}
    </div>
  );
}