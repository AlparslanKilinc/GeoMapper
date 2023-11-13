import BaseMapDataEditor from './BaseMapDataEditor';

const spikemapConfig = {
    mapGraphicsType: "Spike Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'height', label: 'column for height' },
    ],
};

const SpikemapDataEditor = BaseMapDataEditor(spikemapConfig);

export default SpikemapDataEditor;
