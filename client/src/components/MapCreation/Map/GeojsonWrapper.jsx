import React, { useRef, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { useMap } from 'react-leaflet';
import { setSelectedRegionIdx } from '../../../redux-slices/mapGraphicsDataSlice';
import { useDispatch } from 'react-redux';
import '../../../styles/map-label.css';

export default function GeojsonWrapper({ isStyled }) {
  const dispatch = useDispatch();
  const map = useMap();
  const geojsonLayer = useRef();
  const { geoJSON } = useSelector((state) => state.geojson.geojson);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const nameByProperty = useSelector((state) => state.mapGraphics.nameByProperty);
  const { colors, continousColorScale, borderColor, borderWidth, opacity } = useSelector(
    (state) => state.mapStyles
  );

  useEffect(() => {
    console.log('GeojsonWrapper rendered');
  }, []);

  const styles = { color: 'black', weight: 1 };

  if (isStyled) {
    styles.color = borderColor;
    styles.weight = borderWidth;
    styles.fillOpacity = opacity;
  }

  const generateRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

  let onEachFeature = (feature, layer) => {};

  useEffect(() => {
    if (geojsonLayer) {
      map.fitBounds(geojsonLayer.current.getBounds());
    }
  }, []);

  if (isStyled) {
    onEachFeature = (feature, layer) => {
      // check if map graphics type is choropleth

      let name = '';
      if (mapGraphicsType === 'Choropleth Map') {
        let regionData = regions[feature.properties.regionIdx];
        name = regionData[nameByProperty];
        // find the color for the region by the colorByProperty inside colors array

        // check type of colorByProperty
        let color = generateRandomColor();
        let colorPropVal = regionData[colorByProperty];
        if (!isNaN(colorPropVal)) {
          color = continousColorScale[feature.properties.regionIdx];
        } else {
          let colorObj = colors.find((color) => color.name === regionData[colorByProperty]);
          if (colorObj) color = colorObj.color;
        }
        layer.setStyle({ fillColor: color });
      }
      const onClick = (e) => {
        dispatch(setSelectedRegionIdx(feature.properties.regionIdx));
      };

      let labels = false;
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
      {geoJSON && (
        <GeoJSON data={geoJSON} style={styles} onEachFeature={onEachFeature} ref={geojsonLayer} />
      )}
    </div>
  );
}
