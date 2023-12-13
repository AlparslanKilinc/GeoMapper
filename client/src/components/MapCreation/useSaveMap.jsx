import { useDispatch, useSelector } from 'react-redux';
import {
  saveMapGraphicsData,
  updateMapGraphicsDataById
} from '../../redux-slices/mapGraphicsDataSlice';
import { saveMapStylesData, updateMapStylesDataById } from '../../redux-slices/mapStylesSlice';
import { saveMap, updateMapMetaDataById, updateDataIds } from '../../redux-slices/mapMetadataSlice';
import { createGeojson } from '../../redux-slices/geoJSONSlice';
import domtoimage from 'dom-to-image';

export const useSaveMap = () => {
  const dispatch = useDispatch();
  const geojson = useSelector((state) => state.geojson);
  const mapMetadata = useSelector((state) => state.mapMetadata);
  const captureMapAsFile = async () => {
    const mapElement = document.getElementById('mapContainer');
    if (!mapElement) {
      throw new Error('Map container not found');
    }

    try {
      const exportOptions = {
        height: mapElement.offsetHeight * 4,
        width: mapElement.offsetWidth * 4,
        style: {
          transform: 'scale(4)',
          transformOrigin: 'top left',
          width: mapElement.offsetWidth + 'px',
          height: mapElement.offsetHeight + 'px'
        },
        quality: 2
      };

      const dataUrl = await domtoimage.toPng(mapElement, exportOptions);

      // Convert Data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Return the Blob as a File
      return new File([blob], 'map-image.png', { type: 'image/png' });
    } catch (error) {
      console.error('Error capturing map:', error);
      throw error;
    }
  };

  const saveMapGraphics = async () => {
    const action = await dispatch(saveMapGraphicsData());
    let mapGraphicsId = null;
    if (action.meta.requestStatus === 'fulfilled') {
      mapGraphicsId = action.payload; // Assuming the payload contains the ID
    }
    return mapGraphicsId;
  };
  const saveMapStyles = async () => {
    const action = await dispatch(saveMapStylesData());
    let mapStylesId = null;
    if (action.meta.requestStatus === 'fulfilled') {
      mapStylesId = action.payload; // Assuming the payload contains the ID
    }
    return mapStylesId;
  };

  const saveGeojson = async () => {
    let geojsonId = geojson.selectedGeoId;
    console.log(geojsonId);
    if (!geojsonId) {
      let action = await dispatch(createGeojson());
      if (action.meta.requestStatus === 'fulfilled') {
        geojsonId = action.payload.id; // Assuming the payload contains the ID
      }
    }
    return geojsonId;
  };

  const createMapData = async () => {
    const graphicsDataId = await saveMapGraphics();
    const stylesDataId = await saveMapStyles();
    const geoDataId = await saveGeojson();
    const thumbnailFile = await captureMapAsFile();
    dispatch(updateDataIds({ graphicsDataId, stylesDataId, geoDataId }));
    dispatch(saveMap({ thumbnailFile }));
  };

  const updateMapData = async () => {
    const thumbnailFile = await captureMapAsFile();
    const updateGeojson = dispatch(updateDataIds({ geoDataId: geojson.selectedGeoId }));
    const mapStylesData = dispatch(updateMapStylesDataById(mapMetadata.stylesDataId));
    const mapGraphicsData = dispatch(updateMapGraphicsDataById(mapMetadata.graphicsDataId));
    const mapMetaData = dispatch(updateMapMetaDataById(thumbnailFile));
    const mapData = await Promise.all([mapGraphicsData, mapStylesData, mapMetaData]);
  };

  const saveMapData = async () => {
    if (mapMetadata.mapId) {
      await updateMapData();
    } else {
      await createMapData();
    }
  };
  return saveMapData;
};
