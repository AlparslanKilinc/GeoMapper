import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';
import SymbolLayer from '../MapGraphicsEditor/StylesMenu/Shapes/SymbolLayer';
import DotDensityLayer from '../MapGraphicsEditor/StylesMenu/Shapes/DotDensityLayer';
import { useMapEvents } from 'react-leaflet';
import { addPoint } from '../../../redux-slices/mapGraphicsDataSlice';
import { useDispatch } from 'react-redux';
import * as turf from '@turf/turf';

const isPointInPolygon = (point, geojson) => {
  const turfPoint = turf.point([point.lon, point.lat]);
  let isInside = false;
  if (geojson && geojson.geoJSON && geojson.geoJSON.features) {
    geojson.geoJSON.features.forEach((feature) => {
      if (turf.booleanPointInPolygon(turfPoint, feature)) {
        isInside = true;
      }
    });
  }
  return isInside;
};

// rename this layer to SymbolLayerEventHandler

const GeoJsonMap = ({ styled }) => {
  const dispatch = useDispatch();
  const mapBackgroundColor = useSelector((state) => state.mapStyles.mapBackgroundColor);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const renderSymbolLayer = mapGraphicsType === 'Symbol Map' && styled;
  const renderSpikeLayer = mapGraphicsType === 'Spike Map' && styled;
  const renderDotDensityLayer = mapGraphicsType === 'Dot Density Map' && styled;

  // give it default propertie values extracted from a single point
  const getDefaultPointProperties = () => {
    return {
      size: 28,
      color: 'Kobe',
      opacity: 1
    };
  };

  const EventHandlerLayer = () => {
    //     '44.3148#-85.6024': { lat: 44.3148, lon: -85.6024, size: 12, color: 'Kobe', opacity: 0.4
    const addSymbolMode = useSelector((state) => state.mapGraphics.addSymbolMode);
    const geojson = useSelector((state) => state.geojson.geojson);

    const map = useMapEvents({
      click: (e) => {
        if (addSymbolMode) {
          const [lat, lon] = [e.latlng.lat, e.latlng.lng];

          if (isPointInPolygon({ lat, lon }, geojson)) {
            const properties = getDefaultPointProperties();
            dispatch(addPoint({ lat, lon, ...properties }));
          } else alert('POINT OUTSIDE');
        }

        // propogate the event to the map
      }
    });
    return null;
  };

  return (
    <MapContainer
      style={{
        flexGrow: 1,
        backgroundColor: styled ? mapBackgroundColor : 'white'
      }}
      key={mapBackgroundColor}
    >
      <GeojsonWrapper isStyled={styled} />
      {(renderSymbolLayer || renderSpikeLayer) && <SymbolLayer />}
      {renderDotDensityLayer && <DotDensityLayer />}

      {(renderSymbolLayer || renderSpikeLayer) && <EventHandlerLayer />}
    </MapContainer>
  );
};

export default GeoJsonMap;
