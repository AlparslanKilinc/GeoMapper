import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialColumnNames, addColumn, addRow, modifyCell, checkMatch } from '../../../redux-slices/mapDataEditorSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Divider, List, ListItem, FormControl, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Typography, Box } from '@mui/material';
import '../../../styles/tabularEdtitor.css';

const BaseTabularEditor = (config) => {
    return (props) => {
        const dispatch = useDispatch();
        const columnNames = useSelector(state => state.mapDataEditor.columnNames);
        const data = useSelector(state => state.mapDataEditor.data);
        const isMatchSuccessful = useSelector(state => state.mapDataEditor.isMatchSuccessful);

        useEffect(() => {
            if (config.initialColumnNames) {
                dispatch(setInitialColumnNames(config.initialColumnNames));
            }
        }, []);

        const handleAddColumn = () => {
            const newColumnName = window.prompt('Enter new column name');
            if (newColumnName) {
                dispatch(addColumn(newColumnName));
            }
        };

        const handleAddRow = () => {
            dispatch(addRow());
        };

        const handleCellChange = (rowIndex, columnName, value) => {
            dispatch(modifyCell({ rowIndex, columnName, value }));
        };

        const handleCheck = () => {
            dispatch(checkMatch());
        };

        const handleDelete = () => { };

        const renderDefaultTableButtons = () => (
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

        const renderTable = () => (
            <div id="table-container">
                <Table size="small" className="scrollable-table">
                    <TableHead>
                        <TableRow>
                            {columnNames.map((colName, index) => (
                                <TableCell key={index}>{colName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columnNames.map((colName, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <TextField
                                            value={row[colName] || ''}
                                            onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
                                            sx={{
                                                '& input': {
                                                    padding: '0.3em 0.5em',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {config.renderCustomizedTableButtons
                    ? config.renderCustomizedTableButtons()(handleAddColumn, handleDelete)
                    : renderDefaultTableButtons()}
            </div >
        );

        const renderMatchPanel = () => (
            <List
                sx={{
                    padding: '0',
                    '& .MuiListItem-root': {
                        paddingTop: '0',
                        paddingBottom: '0',
                    }
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                {config.matchRows.map((item, index) => (
                    <ListItem key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <FormControl fullWidth>
                            <p className='normalText'>{item.label}</p>
                            <Select
                                labelId={`${item.id}-label`}
                                id={item.id}
                                // value={matchSelections[item.id]}
                                // onChange={(e) => handleMatchChange(item.id, e)}
                                sx={{
                                    '.MuiSelect-select': {
                                        padding: '0.3em 0.5em',
                                    }
                                }}
                            >
                                {columnNames.map((columnName) => (
                                    <MenuItem key={columnName} value={columnName}>
                                        {columnName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                ))}
            </List>
        );

        return (
            <div id="tabular-page">
                <div id="data-editing-page-mid">
                    {renderTable()}
                </div>
                <div id="data-editing-page-right">
                    <div className="header-primary">
                        <h2>match</h2>
                        <Divider style={{ width: '50%' }} />
                    </div>
                    {renderMatchPanel()}
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}>
                        <ReportProblemIcon color="action" />
                        <Typography variant="body2" className="normalText">
                            You can set number, date, and text columns using the menu in the column header.
                        </Typography>
                    </Box>
                    <LoadingButton
                        variant="outlined"
                        style={{ color: 'black', borderColor: 'black' }}
                        onClick={handleCheck}
                    >
                        check
                    </LoadingButton>
                    {isMatchSuccessful && (
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}>
                            <Typography variant="body2" className="normalText" color="#40e0d0">
                                √ All map regions were matched!
                            </Typography>
                        </Box>
                    )}
                </div>
            </div >
        );
    };
};

export default BaseTabularEditor;
