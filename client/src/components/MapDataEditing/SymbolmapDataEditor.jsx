import BaseMapDataEditor from './BaseMapDataEditor';
import { LoadingButton } from '@mui/lab';

const renderCustomizedTableButtons = (params) => {
    return (handleAddColumn, handleAddRow, handleDelete) => {
        return (
            <div id="table-buttons">
                <LoadingButton
                    variant="outlined"
                    style={{ color: '#40e0d0', borderColor: '#40e0d0' }}
                    onClick={handleAddColumn}
                >
                    Add Column
                </LoadingButton>
                <LoadingButton
                    variant="outlined"
                    style={{ color: '#40e0d0', borderColor: '#40e0d0' }}
                    onClick={handleAddRow}
                >
                    Add Row
                </LoadingButton>
                <LoadingButton
                    variant="outlined"
                    style={{ color: 'red', borderColor: 'red' }}
                    onClick={handleDelete}
                >
                    Delete
                </LoadingButton>
            </div>
        );
    };
};

const heatmapConfig = {
    mapGraphicsType: "Symbol Map",
    initialColumnNames: ['Name', 'Lat', 'Long', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'latitude', label: 'column for latitude' },
        { id: 'longitude', label: 'column for longitude' },
        { id: 'size', label: 'column for size' },
    ],
    renderCustomizedTableButtons: renderCustomizedTableButtons,
};

const SymbolmapDataEditor = BaseMapDataEditor(heatmapConfig);

export default SymbolmapDataEditor;
