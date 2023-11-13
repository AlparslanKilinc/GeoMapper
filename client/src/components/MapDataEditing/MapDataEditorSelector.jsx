import { useSelector } from 'react-redux';
import SymbolmapDataEditor from './SymbolmapDataEditor';
import ChoroplethmapDataEditor from './ChoroplethmapDataEditor';

const MapDataEditorSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapDataEditor />;
        case "Choropleth Map":
            return <ChoroplethmapDataEditor />;
        default:
            return null; // or some default component or behavior
    }
};

export default MapDataEditorSelector;