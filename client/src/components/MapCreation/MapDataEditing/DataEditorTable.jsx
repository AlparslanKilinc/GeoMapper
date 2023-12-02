import React, { useState, useEffect, useMemo } from 'react';
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
  validateColumnData,
  validateCell,
  changeNameByProperty,
  changeColorByProperty,
  changeLatByProperty,
  changeLonByProperty,
  changeSizeByProperty,
  changeHeightByProperty,
  TableValidation,
  updateColumnName,
  setPointProperty,
  addPoint,
  removePoint
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
    latByProperty,
    lonByProperty,
    sizeByProperty,
    heightByProperty,
    columnValidationErrors,
    cellValidationErrors,
    addCellValidationErrors
  } = useSelector((state) => state.mapGraphics);
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [labels, setLabels] = useState([]);
  const [columnErrors, setColumnValidationErrors] = useState({});
  const [cellErrors, setCellValidationErrors] = useState({});
  const geoJSON = useSelector((state) => state.geojson.geojson);
  // This is the data to be displayed in the table
  let data =
    mapGraphicsType === 'Choropleth Map' ||
    mapGraphicsType === 'Heat Map' ||
    mapGraphicsType === 'Dot Density'
      ? regions
      : Object.values(points);

  // This is to get the column label Displayed on top of the Columns that are assigned to XbyProperty (Name, Color, Lat, Lon)
  useEffect(() => {
    switch (mapGraphicsType) {
      case 'Choropleth Map':
      case 'Heat Map':
        setLabels(['Name', 'Color']);
        break;
      case 'Symbol Map':
        setLabels(['Name', 'Lat', 'Lon', 'Color', 'Size']);
        break;
      case 'Spike Map':
        setLabels(['Name', 'Lat', 'Lon', 'Color', 'Height']);
        break;
      case 'Dot Density Map':
        setLabels(['Name']);
        break;
    }
  }, [mapGraphicsType]);

  // This is the Displayed Columns To avoid showing the geojson properties
  useEffect(() => {
    if (!nameByProperty) dispatch(changeNameByProperty('name'));
    if (!colorByProperty) dispatch(changeColorByProperty('color'));
    if (!latByProperty) dispatch(changeLatByProperty('lat'));
    if (!lonByProperty) dispatch(changeLonByProperty('lon'));
    if (!sizeByProperty) dispatch(changeSizeByProperty('size'));
    if (!heightByProperty) dispatch(changeHeightByProperty('height'));
  }, [
    nameByProperty,
    colorByProperty,
    latByProperty,
    lonByProperty,
    sizeByProperty,
    heightByProperty,
    dispatch
  ]);

  useEffect(() => {
    let propertiesBasedOnMapType = [];

    switch (mapGraphicsType) {
      case 'Choropleth Map':
      case 'Heat Map':
        propertiesBasedOnMapType = [nameByProperty, colorByProperty];
        break;
      case 'Symbol Map':
        propertiesBasedOnMapType = [
          nameByProperty,
          latByProperty,
          lonByProperty,
          colorByProperty,
          sizeByProperty
        ];
        break;
      case 'Spike Map':
        propertiesBasedOnMapType = [
          nameByProperty,
          latByProperty,
          lonByProperty,
          colorByProperty,
          heightByProperty
        ];
        break;
      case 'Dot Density Map':
        propertiesBasedOnMapType = [nameByProperty];
        break;
    }

    let uniqueDisplayedProperties = [...propertiesBasedOnMapType];
    addedColumns.forEach((column) => {
      if (!propertiesBasedOnMapType.includes(column)) {
        uniqueDisplayedProperties.push(column);
      }
    });
    setDisplayedProperties(uniqueDisplayedProperties);
  }, [
    mapGraphicsType,
    addedColumns,
    nameByProperty,
    colorByProperty,
    latByProperty,
    lonByProperty,
    sizeByProperty,
    heightByProperty
  ]);

  useEffect(() => {
    setColumnValidationErrors(columnValidationErrors);
    setCellValidationErrors(cellValidationErrors);
  }, [columnValidationErrors, cellValidationErrors]);

  const handleAddColumn = () => {
    const newColumnName = prompt('Enter new column name:');
    if (displayedProperties.includes(newColumnName)) {
      alert('This column name already exists. Please choose a different name.');
      return;
    }
    if (newColumnName && !addedColumns.includes(newColumnName)) {
      dispatch(addColumn(newColumnName));
      dispatch(addProperty({ columnName: newColumnName, mapGraphicsType: mapGraphicsType }));
    }
  };

  const handleRemoveColumn = (columnNameToDelete) => {
    if (window.confirm(`Are you sure you want to delete the "${columnNameToDelete}" column?`)) {
      dispatch(
        deleteProperty({ propertyToDelete: columnNameToDelete, mapGraphicsType: mapGraphicsType })
      );
      dispatch(removeColumn(columnNameToDelete));
      handleClose();
    }
  };

  const handleColumnTypeChange = (newType) => {
    dispatch(setColumnType({ columnName: selectedColumn, columnType: newType }));
    dispatch(
      validateColumnData({ columnName: selectedColumn, columnType: newType, mapGraphicsType })
    );
    dispatch(TableValidation(mapGraphicsType));
    handleClose();
  };

  const handleEditColumn = (columnName) => {
    const newColumnName = prompt('Enter new column name:', columnName).trim();

    // Check if the name is non-empty
    if (!newColumnName) {
      alert('Column name cannot be empty.');
      return;
    }

    // Check if the name is unique
    if (displayedProperties.includes(newColumnName)) {
      alert('This column name already exists. Please choose a different name.');
      return;
    }

    // Check if the name is different from the old name
    if (newColumnName !== columnName) {
      dispatch(
        updateColumnName({
          oldName: columnName,
          newName: newColumnName,
          mapGraphicsType: mapGraphicsType
        })
      );
    }

    handleClose();
  };

  const handleCellChange = (rowIndex, columnName, value) => {
    if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
      dispatch(setPointProperty({ propertyName: columnName, value, pointIdx: rowIndex }));
    } else {
      dispatch(setRegionProperty({ propertyName: columnName, value, id: rowIndex }));
    }
    dispatch(validateCell({ rowIndex, columnName, value, mapGraphicsType, geoJSON }));
    dispatch(
      validateColumnData({ columnName, columnType: columnTypes[columnName], mapGraphicsType })
    );
    dispatch(TableValidation(mapGraphicsType));
  };

  const handleAddPoint = () => {
    // Default opacity is 0.4
    const properties = {
      name: '',
      color: '',
      lat: 0,
      lon: 0,
      size: 0,
      opacity: 0.4
    };
    dispatch(setColumnType({ columnName: 'size', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'opacity', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'lat', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'lon', columnType: 'number' }));
    dispatch(addPoint({ properties }));
  };

  const handleRemovePoint = (rowIndex) => {
    if (window.confirm('Are you sure you want to delete this point?')) {
      dispatch(removePoint({ rowIndex }));
    }
  };

  // Helper Functions
  // This is to check if the column is deletable or not
  const isDeletable = (columnName) => {
    return ![
      nameByProperty,
      colorByProperty,
      latByProperty,
      lonByProperty,
      sizeByProperty,
      heightByProperty
    ].includes(columnName);
  };

  const isNumberProperty = (property) => {
    return [sizeByProperty, heightByProperty, latByProperty, lonByProperty].includes(property);
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
      {mapGraphicsType !== 'Choropleth Map' && mapGraphicsType !== 'Heat Map' && (
        <LoadingButton
          variant="outlined"
          style={{ color: '#40e0d0', borderColor: '#40e0d0' }}
          onClick={handleAddPoint}
        >
          Add Point
        </LoadingButton>
      )}
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
        <div id="table-header-container">
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {labels.map((label, index) => (
                  <TableCell sx={{ minWidth: '150px', borderBottom: "none" }}>
                    <div style={{ display: 'flex' }}>
                      <div className="table-label">{label}</div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                {displayedProperties.map((colName, index) => (
                  <TableCell sx={{ minWidth: '150px' }} key={index}>
                    <div style={{ display: 'flex' }}>
                      <span>{colName}</span>
                      <MoreVertIcon
                        onClick={(e) => handleClick(e, colName)}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </div>
        <div id="table-body-container">
          <Table size="small">
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {displayedProperties.map((colName, colIndex) => (
                    <TableCell sx={{ minWidth: '150px' }} key={colIndex}>
                      <TextField
                        value={row[colName] || ''}
                        onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
                        error={!!cellErrors[`${rowIndex}-${colName}`]}
                        helperText={cellErrors[`${rowIndex}-${colName}`]}
                        sx={{
                          '& input': {
                            padding: '0.3em 0.5em'
                          }
                        }}
                      />
                    </TableCell>
                  ))}
                  {mapGraphicsType !== 'Choropleth Map' && mapGraphicsType !== 'Heat Map' && (
                    <TableCell>
                      <DeleteIcon
                        onClick={() => handleRemovePoint(rowIndex)}
                        sx={{ marginRight: '10px', cursor: 'pointer' }}
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
                <TableCell sx={{ minWidth: '150px', verticalAlign: 'bottom' }} key={index}>
                  {columnErrors[colName] ? (
                    <span style={{ color: 'red' }}>{columnErrors[colName]}</span>
                  ) : (
                    <span style={{ color: 'green' }}>✓</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </Table>
        </div>
        <TableButtons />
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
              {!isNumberProperty(selectedColumn) && (
                <FormControlLabel value="text" control={<Radio />} label="Text" />
              )}
              <FormControlLabel value="number" control={<Radio />} label="Number" />
            </RadioGroup>
          </FormControl>
        </MenuItem>
        {isDeletable(selectedColumn) && (
          <MenuItem onClick={() => handleEditColumn(selectedColumn)}>Edit Column Name</MenuItem>
        )}
        {isDeletable(selectedColumn) && (
          <MenuItem onClick={() => handleRemoveColumn(selectedColumn)}>Delete Column</MenuItem>
        )}
      </Menu>
    </div>
  );
}
