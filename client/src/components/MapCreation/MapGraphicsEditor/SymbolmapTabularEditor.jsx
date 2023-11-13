import BaseTabularEditor from './BaseTabularEditor';

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

const SymbolmapTabularEditor = BaseTabularEditor(symbolmapConfig);

export default SymbolmapTabularEditor;
