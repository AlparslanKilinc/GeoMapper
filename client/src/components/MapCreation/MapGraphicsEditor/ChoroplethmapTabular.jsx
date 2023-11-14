import BaseTabularEditor from './BaseTabularEditor';
import { LoadingButton } from '@mui/lab';

const renderCustomizedTableButtons = (params) => {
    return (handleAddColumn, handleDelete) => {
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
                    style={{ color: 'red', borderColor: 'red' }}
                    onClick={handleDelete}
                >
                    Delete
                </LoadingButton>
            </div>
        );
    };
};

const choroplethmapConfig = {
    mapGraphicsType: "Choropleth Map",
    initialColumnNames: ['Name', 'Population'],
    matchRows: [
        { id: 'name', label: 'column for name' },
        { id: 'value', label: 'column for value' },
    ],
    renderCustomizedTableButtons: renderCustomizedTableButtons,
};

const ChoroplethmapTabular = BaseTabularEditor(choroplethmapConfig);

export default ChoroplethmapTabular;
