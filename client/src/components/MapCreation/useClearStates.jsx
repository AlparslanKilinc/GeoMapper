import { useDispatch } from 'react-redux';
import { deleteGeojsonById,resetGeoJsonData } from '../../redux-slices/geoJSONSlice';
import { resetMapGraphicsData } from '../../redux-slices/mapGraphicsDataSlice';
import { resetMapStylesData } from '../../redux-slices/mapStylesSlice.js';
import { resetMapMetaDataFromDraft, resetMapMetaData } from '../../redux-slices/mapMetadataSlice.js';

export const useClearStates = () => {
  const dispatch = useDispatch();

  const DraftClearDeletingGeojson = () => {
    dispatch(deleteGeojsonById());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaDataFromDraft());
  };

  const clearStatesComplete = () => {
    dispatch(deleteGeojsonById());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaData());
  }

  const deleteClearStatesComplete = () => {
    dispatch(deleteGeojsonById());
    dispatch(resetMapGraphicsData());
    dispatch(resetMapStylesData());
    dispatch(resetMapMetaData());
  }
  return { DraftClearDeletingGeojson, clearStatesComplete, deleteClearStatesComplete};
};
