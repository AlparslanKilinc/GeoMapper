import { useSelector } from 'react-redux';
import SymbolmapDataEditor from './SymbolmapDataEditor';
import ChoroplethmapDataEditor from './ChoroplethmapDataEditor';
import HeatmapDataEditor from './HeatmapDataEditor';
import DotdensitymapDataEditor from './DotdensitymapDataEditor';
import SpikemapDataEditor from './SpikemapDataEditor';

const MapDataEditorSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapDataEditor />;
        case "Choropleth Map":
            return <ChoroplethmapDataEditor />;
        case "Heat Map":
            return <HeatmapDataEditor />;
        case "Dot Density Map":
            return <DotdensitymapDataEditor />;
        case "Spike Map":
            return <SpikemapDataEditor />;
        default:
            return null; // or some default component or behavior
    }
};

export default MapDataEditorSelector;