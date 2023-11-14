import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columnNames: [],
    data: [{
        Name: "New York",
        Lat: 40.146543,
        Long: -74.243512,
        Population: 20,
        Value: 300,
        Radius: 10,
        Height: 90,
        Size: 140,
    },
    {
        Name: "California",
        Lat: 64.88653,
        Long: 14.743342,
        Population: 60,
        Value: 900,
        Radius: 30,
        Height: 70,
        Size: 220,
    }],
    isMatchSuccessful: false,
};

export const mapDataEditorSlice = createSlice({
    name: 'mapDataEditor',
    initialState,
    reducers: {
        setInitialColumnNames: (state, action) => {
            state.columnNames = action.payload;
        },
        addColumn: (state, action) => {
            state.columnNames.push(action.payload);
            state.data = state.data.map(row => ({ ...row, [action.payload]: '' }));
        },
        addRow: (state) => {
            const newRow = state.columnNames.reduce((acc, columnName) => {
                acc[columnName] = '';
                return acc;
            }, {});
            state.data.push(newRow);
        },
        modifyCell: (state, action) => {
            const { rowIndex, columnName, value } = action.payload;
            state.data[rowIndex][columnName] = value;
        },
        checkMatch: (state) => {
            state.isMatchSuccessful = true;
        },
    },
});

export const { setInitialColumnNames, addColumn, addRow, modifyCell, checkMatch } = mapDataEditorSlice.actions;

export default mapDataEditorSlice.reducer;
