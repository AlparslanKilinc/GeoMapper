import { useSelector } from 'react-redux';
import SymbolmapTabular from './SymbolmapTabular';
import ChoroplethmapTabular from './ChoroplethmapTabular';
import HeatmapTabular from './HeatmapTabular';
import DotdensitymapTabular from './DotdensitymapTabular';
import SpikemapTabular from './SpikemapTabular';

const TabularSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapTabular />;
        case "Choropleth Map":
            return <ChoroplethmapTabular />;
        case "Heat Map":
            return <HeatmapTabular />;
        case "Dot Density Map":
            return <DotdensitymapTabular />;
        case "Spike Map":
            return <SpikemapTabular />;
        default:
            return null; // or some default component or behavior
    }
};

export default TabularSelector;