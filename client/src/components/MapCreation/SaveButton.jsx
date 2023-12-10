import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import { saveMapStylesData } from '../../redux-slices/mapStylesSlice';
import { createGeojson } from '../../redux-slices/geoJSONSlice';
import { saveMap } from '../../redux-slices/mapMetadataSlice';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button } from '@mui/material';

export default function SaveButton() {
  const geojson = useSelector((state) => state.geojson);
  const mapMetadata = useSelector((state) => state.mapMetadata);
  const dispatch = useDispatch();

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
    const mapGraphicsId = await saveMapGraphics();
    const mapStylesId = await saveMapStyles();
    const geojsonId = await saveGeojson();
    const map = {
      mapGraphicsId,
      mapStylesId,
      geojsonId,
      ...mapMetadata
    };
    dispatch(saveMap(map));
  };

  return (
    <Button variant="outlined" aria-label="save" onClick={createMap}>
      <SaveOutlinedIcon />
    </Button>
  );
}
