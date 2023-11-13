import BaseMapDataEditor from './BaseMapDataEditor';

const dotdensitymapConfig = {
    mapGraphicsType: "Dot Density Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'size', label: 'column for size' },
    ],
};

const DotdensitymapDataEditor = BaseMapDataEditor(dotdensitymapConfig);

export default DotdensitymapDataEditor;
