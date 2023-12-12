import React, { useState, useEffect, useMemo } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AlertComponent from '../../AlertComponent.jsx';
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
  removePoint,
  validateRow,
  validateAllCells
} from '../../../redux-slices/mapGraphicsDataSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
export default function DataEditorTable() {
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
    dotDensityByProperty
  } = useSelector((state) => state.mapGraphics);
  const mapGraphicsType = useSelector((state) => state.mapMetadata.mapGraphicsType);
  const geoJSON = useSelector((state) => state.geojson.geojson);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [labels, setLabels] = useState([]);
  const [columnErrors, setColumnValidationErrors] = useState({});
  const [cellErrors, setCellValidationErrors] = useState({});
  const [cellEdits, setCellEdits] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState('');
  const [deletePointModal, setDeletePointModal] = useState(false);
  const [rowIndex, setRowIndex] = useState(null);

  const openDeletePointModal = (selectedPoint) => {
    setDeletePointModal(true);
    setRowIndex(selectedPoint);
  };
  const closePointDeleteModal = () => {
    setDeletePointModal(false);
  };
  const openDeleteModal = (selectedColumn) => {
    setDeleteModal(true);
    setColumnToDelete(selectedColumn);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
    handleClose();
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // This is the data to be displayed in the table
  let data =
    mapGraphicsType === 'Choropleth Map' ||
    mapGraphicsType === 'Heat Map' ||
    mapGraphicsType === 'Dot Density Map'
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

  // Get the displayed properties based on the map type
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
        propertiesBasedOnMapType = [nameByProperty, ...dotDensityByProperty];
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
    heightByProperty,
    dotDensityByProperty
  ]);

  useEffect(() => {
    dispatch(setColumnType({ columnName: 'lat', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'lon', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'size', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'height', columnType: 'number' }));
  }, []);

  // This is to update the column errors and cell errors
  useEffect(() => {
    setColumnValidationErrors(columnValidationErrors);
    setCellValidationErrors(cellValidationErrors);
  }, [columnValidationErrors, cellValidationErrors]);

  // This is to adjust the width of the table for sticky header
  useEffect(() => {
    const header = document.getElementById('table-header-container');
    const body = document.getElementById('table-container');

    function adjustHeaderWidth() {
      if (header && body) {
        if (body.scrollWidth > body.clientWidth) {
          header.style.width = 'fit-content';
        } else {
          header.style.width = '100%';
        }
      }
    }
    adjustHeaderWidth();
    window.addEventListener('resize', adjustHeaderWidth);

    return () => window.removeEventListener('resize', adjustHeaderWidth);
  }, [displayedProperties]);

  const handleAddColumn = () => {
    handleCloseModal();
    if (newColumnName.length == 0) {
      setAlertMessage('Column name cannot be empty!');
      setAlertSeverity('error');
      setShowAlert(true);
    }
    if (displayedProperties.includes(newColumnName)) {
      setAlertMessage('Column name already exists!');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }
    if (newColumnName && !addedColumns.includes(newColumnName)) {
      dispatch(addColumn(newColumnName));
      dispatch(addProperty({ columnName: newColumnName, mapGraphicsType: mapGraphicsType }));
      setAlertMessage('Column Successfully added');
      setAlertSeverity('success');
      setShowAlert(true);
    }
  };

  const handleInputChange = (event) => {
    setNewColumnName(event.target.value);
  };
  const handleRemoveColumn = () => {
    dispatch(
      deleteProperty({ propertyToDelete: columnToDelete, mapGraphicsType: mapGraphicsType })
    );
    dispatch(removeColumn(columnToDelete));
    dispatch(TableValidation(mapGraphicsType));
    handleClose();
    setDeleteModal(false);
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
      setAlertMessage('Column name cannot be empty!');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    // Check if the name is unique
    if (displayedProperties.includes(newColumnName)) {
      setAlertMessage('Column name already exists!');
      setAlertSeverity('error');
      setShowAlert(true);
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
    setAlertMessage('Column successfully added');
    setAlertSeverity('success');
    setShowAlert(true);
    handleClose();
  };

  /// Point Functions
  const handleAddPoint = () => {
    const properties = {
      name: '',
      color: '',
      lat: 0,
      lon: 0,
      opacity: 0.4
    };
    dispatch(setColumnType({ columnName: 'size', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'height', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'opacity', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'lat', columnType: 'number' }));
    dispatch(setColumnType({ columnName: 'lon', columnType: 'number' }));
    dispatch(addPoint({ properties }));
    dispatch(validateRow({ rowIndex: points.length, mapGraphicsType, geoJSON }));
  };

  const handleRemovePoint = () => {
    dispatch(removePoint({ rowIndex }));
    dispatch(validateRow({ rowIndex }, mapGraphicsType, geoJSON));
    // validate all columns in the points also get the column names from the object to validate everything
    for (let property in points[rowIndex]) {
      dispatch(
        validateColumnData({
          columnName: property,
          columnType: columnTypes[property],
          mapGraphicsType
        })
      );
    }
    dispatch(validateAllCells({ mapGraphicsType, geoJSON }));
    dispatch(TableValidation(mapGraphicsType));
    closePointDeleteModal();
  };

  useEffect(() => {
    dispatch(validateAllCells({ mapGraphicsType, geoJSON }));
    dispatch(TableValidation(mapGraphicsType));
  }, [points, latByProperty, lonByProperty, sizeByProperty, heightByProperty]);

  const handleCellChange = (rowIndex, columnName, value) => {
    setCellEdits({
      ...cellEdits,
      [`${rowIndex}-${columnName}`]: value
    });
  };

  const handleCellCommit = (rowIndex, columnName) => {
    const cellKey = `${rowIndex}-${columnName}`;
    const value = cellEdits[cellKey];
    if (value !== undefined) {
      if (mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') {
        dispatch(setPointProperty({ propertyName: columnName, value, pointIdx: rowIndex }));
      } else {
        dispatch(setRegionProperty({ propertyName: columnName, value, id: rowIndex }));
      }
      dispatch(
        validateColumnData({ columnName, columnType: columnTypes[columnName], mapGraphicsType })
      );
      dispatch(validateCell({ rowIndex, columnName, value, mapGraphicsType, geoJSON }));
      dispatch(TableValidation(mapGraphicsType));
    }
    // remove the cell edit from local state
    const newCellEdits = { ...cellEdits };
    delete newCellEdits[cellKey];
    setCellEdits(newCellEdits);
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
      {(mapGraphicsType === 'Symbol Map' && mapGraphicsType !== 'Spike Map') && (
        <LoadingButton
          variant="outlined"
          style={{ color: 'black', borderColor: 'black' }}
          onClick={handleAddPoint}
        >
          Add Point
        </LoadingButton>
      )}
      <LoadingButton
        variant="outlined"
        style={{ color: 'black', borderColor: 'black' }}
        onClick={handleOpenModal}
      >
        Add Column
      </LoadingButton>
    </div>
  );

  return (
    <div id="data-editing-page-mid">
      <div id="table-container">
        {showAlert && (
          <AlertComponent
            alertSeverity={alertSeverity}
            alertMessage={alertMessage}
            autoHideDuration={2000}
            handleCloseAlert={handleCloseAlert}
          />
        )}
        <div
          id="table-header-container"
          style={{
            marginLeft:
              mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map' ? '58px' : '0px'
          }}
        >
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {labels.map((label, index) => (
                  <TableCell key={index} sx={{ minWidth: '150px', borderBottom: 'none' }}>
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
          <div id="table-column-errors">
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
        </div>

        <div id="table-body-container">
          <Table size="small">
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {(mapGraphicsType === 'Symbol Map' || mapGraphicsType === 'Spike Map') && (
                    <TableCell>
                      <DeleteIcon
                        onClick={() => openDeletePointModal(rowIndex)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </TableCell>
                  )}
                  {displayedProperties.map((colName, colIndex) => (
                    <TableCell sx={{ minWidth: '150px' }} key={colIndex}>
                      <TextField
                        value={
                          cellEdits[`${rowIndex}-${colName}`] ??
                          (row[colName] !== null && row[colName] !== undefined ? row[colName] : '')
                        }
                        onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
                        onBlur={() => handleCellCommit(rowIndex, colName)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCellCommit(rowIndex, colName);
                            e.target.blur();
                          }
                        }}
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <TableButtons />
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
          <MenuItem onClick={() => handleEditColumn(selectedColumn)}>Edit Column Name</MenuItem>
        )}
        {isDeletable(selectedColumn) && (
          <MenuItem onClick={() => openDeleteModal(selectedColumn)}>Delete Column</MenuItem>
        )}
      </Menu>

      <Modal open={deleteModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 170,
            height: 60,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 8
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mt: '-50px', ml: '-50px', mb: '30px' }}>
            Are you sure you want to delete the {columnToDelete} column?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleRemoveColumn}>
              Delete
            </Button>
            <Button variant="outlined" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={deletePointModal} onClose={closePointDeleteModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 170,
            height: 60,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 8
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mt: '-50px', ml: '-50px', mb: '30px' }}>
            Are you sure you want to delete this point?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={handleRemovePoint}>
              Delete
            </Button>
            <Button variant="outlined" onClick={closePointDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            height: 60,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mt: '-50px', ml: '-50px' }}>
            Please enter a column name
          </Typography>
          <TextField
            id="standard-basic"
            label="Column name"
            variant="standard"
            value={newColumnName}
            onChange={handleInputChange}
            sx={{ ml: '-50px' }}
          />
          <Button variant="outlined" sx={{ ml: '-50px', mt: '10px' }} onClick={handleAddColumn}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
