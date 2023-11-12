import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    columnNames: [],
    data: [{}],
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
        modifyCell: (state, action) => {
            const { rowIndex, columnName, value } = action.payload;
            state.data[rowIndex][columnName] = value;
        },
        checkMatch: (state) => {
            state.isMatchSuccessful = true;
        },
    },
});

export const { setInitialColumnNames, addColumn, modifyCell, checkMatch } = mapDataEditorSlice.actions;

export default mapDataEditorSlice.reducer;
