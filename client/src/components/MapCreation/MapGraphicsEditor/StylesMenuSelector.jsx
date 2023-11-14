import { useSelector } from 'react-redux';
import StylesMenu from './StylesMenus';
import HeatmapStylesMenu from './HeatmapStylesMenu';

const StylesMenuSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Heat Map":
            return <HeatmapStylesMenu />;
        default:
            return <StylesMenu />;
    }
};

export default StylesMenuSelector;