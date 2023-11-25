import { useSelector } from 'react-redux';
import SymbolmapDataEditor from '../../MapDataEditing/SymbolmapDataEditor';
import ChoroplethmapDataEditor from '../../MapDataEditing/ChoroplethmapDataEditor';
import HeatmapDataEditor from '../../MapDataEditing/HeatmapDataEditor';
import DotdensitymapDataEditor from '../../MapDataEditing/DotdensitymapDataEditor';
import SpikemapDataEditor from '../../MapDataEditing/SpikemapDataEditor';

const TabularSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapDataEditor isTabularTab={true}/>;
        case "Choropleth Map":
            return <ChoroplethmapDataEditor isTabularTab={true}/>;
        case "Heat Map":
            return <HeatmapDataEditor isTabularTab={true}/>;
        case "Dot Density Map":
            return <DotdensitymapDataEditor isTabularTab={true}/>;
        case "Spike Map":
            return <SpikemapDataEditor isTabularTab={true}/>;
        default:
            return null;
    }
};

export default TabularSelector;