import BaseMapDataEditor from './BaseMapDataEditor';

const heatmapConfig = {
    mapGraphicsType: "Symbol Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'size', label: 'column for size' },
    ],
};

const SymbolmapDataEditor = BaseMapDataEditor(heatmapConfig);

export default SymbolmapDataEditor;
