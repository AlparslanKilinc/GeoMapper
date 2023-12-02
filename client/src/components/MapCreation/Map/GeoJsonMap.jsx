import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeojsonWrapper from './GeojsonWrapper';
import SymbolLayer from '../MapGraphicsEditor/StylesMenu/Shapes/SymbolLayer';
import DotDensityLayer from '../MapGraphicsEditor/StylesMenu/Shapes/DotDensityLayer';
import { useMapEvents } from 'react-leaflet';
import { addPoint } from '../../../redux-slices/mapGraphicsDataSlice';
import { useDispatch } from 'react-redux';

const GeoJsonMap = ({ styled }) => {
  const dispatch = useDispatch();

  // give it default propertie values extracted from a single point
  const getDefaultPointProperties = () => {
    return {
      size: 28,
      color: 'Kobe',
      opacity: 1
    };
  };

  // rename this layer to SymbolLayerEventHandler
  const EventHandlerLayer = () => {
    //     '44.3148#-85.6024': { lat: 44.3148, lon: -85.6024, size: 12, color: 'Kobe', opacity: 0.4
    const addSymbolMode = useSelector((state) => state.mapGraphics.addSymbolMode);

    const map = useMapEvents({
      click: (e) => {
        if (addSymbolMode) {
          const [lat, lon] = [e.latlng.lat, e.latlng.lng];
          const properties = getDefaultPointProperties();
          dispatch(addPoint({ lat, lon, ...properties }));
        }

        // propogate the event to the map
      }
    });
    return null;
  };

  const mapBackgroundColor = useSelector((state) => state.mapStyles.mapBackgroundColor);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const renderSymbolLayer = mapGraphicsType === 'Symbol Map' && styled;

  return (
    <MapContainer
      style={{
        flexGrow: 1,
        backgroundColor: styled ? mapBackgroundColor : 'white'
      }}
    >
      <GeojsonWrapper isStyled={styled} />
      {renderSymbolLayer && <SymbolLayer />}

      {renderSymbolLayer && <EventHandlerLayer />}
      {styled && mapGraphicsType === 'Dot Density Map' && <DotDensityLayer />}
    </MapContainer>
  );
};

export default GeoJsonMap;
