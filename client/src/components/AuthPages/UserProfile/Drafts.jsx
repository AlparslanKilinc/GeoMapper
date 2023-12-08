import React, {useEffect} from 'react';
import MapCard from '../../Explore/MapCard';
import {useDispatch, useSelector} from "react-redux";
import {getMetaDataByMapId} from '../../../redux-slices/mapMetadataSlice'


export default function Drafts() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const metadata = useSelector((state) => state.mapMetadata.metadataArray)
    console.log(user.draftedMaps) //ids of all drafts
    const mapIds = user.draftedMaps
    useEffect(() => {

        // Fetch metadata for each mapId
        mapIds.forEach((mapId) => {
            dispatch(getMetaDataByMapId(mapId));
        });
    }, [dispatch,mapIds]); // Include user.draftedMaps and metadata as dependencies

    console.log(metadata);
    

    return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <MapCard showActions={false} />
      <MapCard showActions={false} />
      <MapCard showActions={false} />
    </div>
  );
}
