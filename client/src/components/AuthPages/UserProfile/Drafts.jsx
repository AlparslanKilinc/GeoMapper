import React, {useEffect} from 'react';
import MapCard from '../../Explore/MapCard';
import {useDispatch, useSelector} from "react-redux";
import {getDraftedMetaData} from '../../../redux-slices/mapMetadataSlice'


export default function Drafts() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const metadata = useSelector((state) => state.mapMetadata.metadataArray)
    useEffect(() => {
        dispatch(getDraftedMetaData(user.id));
    }, [dispatch]);
    return (
    <div style={{ display: 'flex', gap: '1rem' }}>
        {metadata.map((meta) => (
            <MapCard key={meta.mapId} showActions={false} metaData={meta} />
        ))}
    </div>
  );
}
