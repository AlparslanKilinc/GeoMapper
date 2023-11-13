import BaseMapDataEditor from './BaseMapDataEditor';
import { LoadingButton } from '@mui/lab';

const symbolmapConfig = {
    mapGraphicsType: "Symbol Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'size', label: 'column for size' },
    ],
};

const SymbolmapDataEditor = BaseMapDataEditor(symbolmapConfig);

export default SymbolmapDataEditor;
