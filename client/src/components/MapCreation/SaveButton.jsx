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
  const mapMetaData = useSelector((state) => state.mapMetaData);
  const dispatch = useDispatch();

  const saveMapGraphics = async () => {
    const mapGraphicsId = dispatch(saveMapGraphicsData());
    return mapGraphicsId;
  };
  const saveMapStyles = async () => {
    const mapStylesId = dispatch(saveMapStylesData());
    return mapStylesId;
  };

  const saveGeojson = async () => {
    let geojsonId = geojson.selectedGeoId;
    if (!geojsonId) {
      geojsonId = dispatch(createGeojson());
    }
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
      ...mapMetaData
    };
    dispatch(saveMap(map));
  };

  return (
    <Button variant="outlined" aria-label="save"  onClick={createMap}>
      <SaveOutlinedIcon />
    </Button>
  );
}
