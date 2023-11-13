import { useSelector } from 'react-redux';
import SymbolmapTabularEditor from './SymbolmapTabularEditor';


const TabularEditorSelector = () => {
    const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);

    switch (mapGraphicsType) {
        case "Symbol Map":
            return <SymbolmapTabularEditor />;
        default:
            return null;
    }
};

export default TabularEditorSelector;