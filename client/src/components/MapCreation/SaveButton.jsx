import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import { saveMapStylesData } from '../../redux-slices/mapStylesSlice';
import { createGeojson } from '../../redux-slices/geoJSONSlice';
import { saveMap } from '../../redux-slices/mapMetadataSlice';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button } from '@mui/material';
import domtoimage from 'dom-to-image';

export default function SaveButton() {
  const geojson = useSelector((state) => state.geojson);
  const mapMetadata = useSelector((state) => state.mapMetadata);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
    // if (!geojsonId) {
    //   geojsonId = await dispatch(createGeojson());
    // }
    // if the geojsonId is already present and then they are uploading a new file we clear the id if the previous map was ours
    // if previous map was theirs then update the compressedGeojson by id
    return geojsonId;
  };

  const createMap = async () => {
    const graphicsDataId = await saveMapGraphics();
    const stylesDataId = await saveMapStyles();
    const geoDataId = await saveGeojson();
    const thumbnailFile = await captureMapAsFile();

    const map = {
      graphicsDataId,
      stylesDataId,
      geoDataId,
      ...mapMetadata
    };
    dispatch(saveMap({ map, thumbnailFile }));
  };

  return (
    <Button variant="outlined" aria-label="save" onClick={createMap}>
      <SaveOutlinedIcon />
    </Button>
  );
}
