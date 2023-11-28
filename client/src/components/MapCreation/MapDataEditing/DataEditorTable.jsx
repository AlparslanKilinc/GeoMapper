import React, { useState, useEffect } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  setRegionProperty,
  addProperty,
  deleteProperty,
  setColumnType,
  addColumn,
  removeColumn,
  validateColumnData
} from '../../../redux-slices/mapGraphicsDataSlice';

export default function DataEditorTable() {
  const dispatch = useDispatch();
  const {
    addedColumns,
    regions,
    points,
    columnTypes,
    colorByProperty,
    nameByProperty,
    LatByProperty,
    LonByProperty,
    columnValidationErrors
  } = useSelector((state) => state.mapGraphics);
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [cellErrors, setCellErrors] = useState({});
  const [columnErrors, setColumnErrors] = useState({});
  // This is the data to be displayed in the table
  let data = mapGraphicsType === 'Choropleth Map' ? regions : Object.values(points);

  // This is the Displayed Columns To avoid showing the geojson properties
  useEffect(() => {
    let initialProperties =
      mapGraphicsType === 'Choropleth Map'
        ? [nameByProperty, colorByProperty]
        : [nameByProperty, LatByProperty, LonByProperty];

    setDisplayedProperties([...new Set([...initialProperties, ...addedColumns])]);
  }, [
    addedColumns,
    mapGraphicsType,
    nameByProperty,
    colorByProperty,
    LatByProperty,
    LonByProperty,
    columnTypes
  ]);
  // This is the Column errors to be displayed in the table
  useEffect(() => {
    setColumnErrors(columnValidationErrors);
  }, [columnValidationErrors]);

  const handleAddColumn = () => {
    const newColumnName = prompt('Enter new column name:');
    if (newColumnName && !addedColumns.includes(newColumnName)) {
      dispatch(addColumn(newColumnName));
      dispatch(addProperty(newColumnName));
    }
  };

  const handleRemoveColumn = (columnNameToDelete) => {
    if (window.confirm(`Are you sure you want to delete the "${columnNameToDelete}" column?`)) {
      dispatch(deleteProperty(columnNameToDelete));
      dispatch(removeColumn(columnNameToDelete));
      handleClose();
    }
  };

  const handleColumnTypeChange = (newType) => {
    dispatch(setColumnType({ columnName: selectedColumn, columnType: newType }));
    dispatch(validateColumnData({ columnName: selectedColumn }));
    handleClose();
  };

  const handleCellChange = (rowIndex, columnName, value) => {
    const columnType = columnTypes[columnName];
    let newErrors = { ...cellErrors };
    const isEmpty = value === undefined || value.trim() === '';

    if (columnType === 'number') {
      const isNumber = isEmpty || (!isNaN(Number(value)) && isFinite(value));
      newErrors[`${rowIndex}-${columnName}`] = !isNumber;
    } else if (columnType === 'text') {
      newErrors[`${rowIndex}-${columnName}`] = !isEmpty && value.trim() === '';
    }

    setCellErrors(newErrors);
    dispatch(setRegionProperty({ propertyName: columnName, value, id: rowIndex }));
    dispatch(validateColumnData({ columnName }));
  };

  const handleDeleteRow = () => {
    // To Do
  };

  const handleDataCheck = () => {
    // To Do
  };

  // Helper Functions
  // This is to check if the column is deletable or not
  const isDeletable = (columnName) => {
    return ![nameByProperty, colorByProperty, LatByProperty, LonByProperty].includes(columnName);
  };

  // This is to get the column label Displayed on top of the Columns that are assigned to XbyProperty (Name, Color, Lat, Lon)
  const getColumnLabel = (columnName) => {
    if (columnName === nameByProperty) {
      return 'Name';
    } else if (columnName === colorByProperty) {
      return 'Color';
    } else if (columnName === LatByProperty) {
      return 'Latitude';
    } else if (columnName === LonByProperty) {
      return 'Longitude';
    } else {
      return columnName;
    }
  };

  // Menu Functions
  const handleClick = (event, columnName) => {
    setAnchorEl(event.currentTarget);
    setSelectedColumn(columnName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const TableButtons = () => (
    <div id="table-buttons">
      <LoadingButton
        variant="outlined"
        style={{ color: '#40e0d0', borderColor: '#40e0d0' }}
        onClick={handleAddColumn}
      >
        Add Column
      </LoadingButton>
    </div>
  );

  return (
    <div id="data-editing-page-mid">
      <div id="table-container" style={{ overflow: 'auto', padding: '1rem' }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {displayedProperties.map((colName, index) => (
                <TableCell sx={{ verticalAlign: 'bottom' }} key={index}>
                  {isDeletable(colName) ? (
                    ''
                  ) : (
                    <div className="table-label">{getColumnLabel(colName)}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {colName}
                    <MoreVertIcon
                      onClick={(e) => handleClick(e, colName)}
                      style={{ cursor: 'pointer', margin: '0', padding: '0' }}
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
        <div id="table-body-container" style={{ overflowY: 'auto' }}>
          <Table size="small">
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {displayedProperties.map((colName, colIndex) => (
                    <TableCell key={colIndex}>
                      <TextField
                        value={row[colName] || ''}
                        onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
                        error={!!cellErrors[`${rowIndex}-${colName}`]}
                        helperText={
                          cellErrors[`${rowIndex}-${colName}`]
                            ? columnTypes[colName] === 'number'
                              ? 'Number Required'
                              : 'Text  Required'
                            : ''
                        }
                        sx={{
                          '& input': {
                            padding: '0.3em 0.5em'
                          }
                        }}
                      />
                    </TableCell>
                  ))}
                  {mapGraphicsType !== 'Choropleth Map' && (
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleDeleteRow(rowIndex)}
                        sx={{ marginTop: '10px', cursor: 'pointer' }}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div id="table-footer">
          <Table size="small">
            <TableRow>
              {displayedProperties.map((colName, index) => (
                <TableCell sx={{ width: '150px', verticalAlign: 'bottom' }} key={index}>
                  {columnErrors[colName] ? (
                    <span style={{ color: 'red' }}>{columnErrors[colName]}</span>
                  ) : (
                    <span style={{ color: 'green' }}>✓</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </Table>
          <TableButtons />
        </div>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControl component="fieldset">
            <RadioGroup
              value={columnTypes[selectedColumn] || 'text'}
              onChange={(e) => handleColumnTypeChange(e.target.value)}
            >
              <FormControlLabel value="text" control={<Radio />} label="Text" />
              <FormControlLabel value="number" control={<Radio />} label="Number" />
            </RadioGroup>
          </FormControl>
        </MenuItem>
        {isDeletable(selectedColumn) && (
          <MenuItem onClick={() => handleRemoveColumn(selectedColumn)}>Delete Column</MenuItem>
        )}
      </Menu>
    </div>
  );
}
