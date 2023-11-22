import React from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { setSelectedRegionIdx } from '../../../redux-slices/mapGraphicsDataSlice';
import { setSelectedFeature } from '../../../redux-slices/mapStylesSlice';
import { useDispatch } from 'react-redux';
import '../../../styles/map-label.css';

export default function GeojsonWrapper({ styles, isStyled }) {
  const dispatch = useDispatch();
  const { geoJSON } = useSelector((state) => state.geojson.geojson);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const { colorByProperty, regions, nameByProperty } = useSelector((state) => state.mapGraphics);
  const { colors } = useSelector((state) => state.mapStyles);

  const map = useMap();
  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  let onEachFeature = (feature, layer) => {};

  if (isStyled) {
    console.log('rerendering geojsonwrapper');
    onEachFeature = (feature, layer) => {
      // check if map graphics type is choropleth

      let name = '';
      if (mapGraphicsType === 'Choropleth Map') {
        let regionData = regions[feature.properties.regionIdx];
        name = regionData[nameByProperty];
        // find the color for the region by the colorByProperty inside colors array
        let color = generateRandomColor();
        let colorObj = colors.find((color) => color.name === regionData[colorByProperty]);
        if (colorObj) color = colorObj.color;
        layer.setStyle({ fillColor: color });
      }
      const onClick = (e) => {
        dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
        dispatch(setSelectedFeature(e.target));
        // change the color of the selected feature
      };

      let labels = true;
      if (labels && name) {
        const label = L.marker(layer.getBounds().getCenter(), {
          icon: L.divIcon({
            className: 'map-label',
            html: name,
            iconSize: [100, 40]
          })
        });

        label.on('click', function (e) {
          // Stop the original event
          L.DomEvent.stopPropagation(e);

          // Manually trigger the event on the target layer
          layer.fire('click');
        });

        // add this label to the map
        label.addTo(map);
      }

      layer.on({
        click: onClick
      });
    };
  }

  return (
    <div styles={{ width: '100%', height: '100%' }}>
      {geoJSON && <GeoJSON data={geoJSON} style={styles} onEachFeature={onEachFeature} />}
    </div>
  );
}
