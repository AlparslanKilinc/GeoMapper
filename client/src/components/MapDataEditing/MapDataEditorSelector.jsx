import { useSelector } from 'react-redux';
import SymbolmapDataEditor from './SymbolmapDataEditor';

const MapDataEditorSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapDataEditor />;
        default:
            return null; // or some default component or behavior
    }
};

export default MapDataEditorSelector;