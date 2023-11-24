import { useSelector } from 'react-redux';
import StylesMenu from './StylesMenus';
import HeatmapStylesMenu from './HeatmapStylesMenu';

const StylesMenuSelector = ({theme}) => {
    console.log(theme)
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Heat Map":
            return <HeatmapStylesMenu theme = {theme}/>;
        default:
            return <StylesMenu theme = {theme}/>;
    }
};

export default StylesMenuSelector;