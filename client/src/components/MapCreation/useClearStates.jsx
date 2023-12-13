import { useDispatch } from 'react-redux';
import { deleteGeojsonById, resetGeoJsonData } from '../../redux-slices/geoJSONSlice';
import { resetMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import { resetMapStylesData } from '../../redux-slices/mapStylesSlice.js';
import { resetMapMetaDataFromDraft, resetMapMetaData } from '../../redux-slices/mapMetadataSlice.js';

export const useClearStates = () => {
  const dispatch = useDispatch();
  // Dont need this anymore since we are not letting them go back to outline selection page when editing draft
  // const DraftClearDeletingGeojson = () => {
  //   dispatch(deleteGeojsonById());
  //   dispatch(resetGeoJsonData());
  //   dispatch(resetMapGraphicsData());
  //   dispatch(resetMapStylesData());
  //   dispatch(resetMapMetaDataFromDraft());
  // };

  const clearStatesComplete = () => {
    dispatch(resetGeoJsonData());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaData());
  }

  return {clearStatesComplete};
};
