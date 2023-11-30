import React, { useRef, useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { setSelectedRegionIdx, clearLabels } from '../../../redux-slices/mapGraphicsDataSlice';
import { useDispatch } from 'react-redux';
import '../../../styles/map-label.css';
// import leaflet css
import 'leaflet/dist/leaflet.css';
import { color } from 'd3';

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
  let previousProp = useSelector((state) => state.mapGraphics.previousProperty);

  const [labels, setLabels] = useState(new Map());

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

      let labelText = regionData[labelByProperty];

      switch (mapGraphicsType) {
        case 'Choropleth Map':
          applyChoroplethStyles(feature, layer, regionData);
          break;
        // Add cases for other map types here
        default:
          // Default behavior if no specific map type is matched
          break;
      }

      if (isLabelVisible && labelText) {
        console.log("previous " + previousProp)
        if(previousProp){
          console.log('remove previous')
          removeLabelLayer();
        }
        addLabelToMap(layer, labelText);
      }
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

  const removeLabelLayer = () => {
    labels.forEach((label, layer) => {
      map.removeLayer(label);
      labels.delete(layer);
    });
  }

  const addLabelToMap = (layer, labelText) => {

    const label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'map-label',
        html: labelText,
        iconSize: [100, 40]
      })
    });

    label.on('click', (e) => {
      L.DomEvent.stopPropagation(e);
      layer.fire('click');
    });

    label.addTo(map);
    setLabels((prev) => new Map(prev).set(layer, label));
  };

  useEffect(() => {
    if (geojsonLayer.current) {
      map.fitBounds(geojsonLayer.current.getBounds());
    }
  }, [geoJSON]);

  useEffect(() => {
    if (!isLabelVisible) {
      labels.forEach((label, layer) => {
        map.removeLayer(label);
        labels.delete(layer);
      });
      setLabels(new Map());
    }
  }, [isLabelVisible]);



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
    </div>
  );
}
