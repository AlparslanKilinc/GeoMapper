import BaseTabularEditor from './BaseTabularEditor';

const heatmapConfig = {
    mapGraphicsType: "Heat Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Value', 'Radius'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'value', label: 'column for value' },
        { id: 'radius', label: 'column for radius' },
    ],
};

const HeatmapTabular = BaseTabularEditor(heatmapConfig);

export default HeatmapTabular;
