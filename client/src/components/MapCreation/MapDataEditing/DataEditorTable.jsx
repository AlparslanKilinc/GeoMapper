import React, { useState, useEffect } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setRegionProperty,addProperty,deleteProperty } from '../../../redux-slices/mapGraphicsDataSlice';

export default function DataEditorTable() {
  const dispatch = useDispatch();
  const {
    regions,
    points,
    valueByProperty,
    colorByProperty,
    nameByProperty,
    LatByProperty,
    LonByProperty
  } = useSelector((state) => state.mapGraphics);
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [addedColumns, setAddedColumns] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  let data = mapGraphicsType === 'Choropleth Map' ? regions : points;

  useEffect(() => {
    let initialProperties =
      mapGraphicsType === 'Choropleth Map'
        ? [nameByProperty, colorByProperty]
        : [nameByProperty, colorByProperty, LatByProperty, LonByProperty];

    setDisplayedProperties([...new Set([...initialProperties, ...addedColumns])]);
  }, [
    addedColumns,
    mapGraphicsType,
    nameByProperty,
    colorByProperty,
    LatByProperty,
    LonByProperty
  ]);

  const handleClick = (event, columnName) => {
    setAnchorEl(event.currentTarget);
    setSelectedColumn(columnName);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isDeletable = (columnName) => {
    return ![nameByProperty, colorByProperty, LatByProperty, LonByProperty].includes(columnName);
  };

  const handleAddColumn = () => {
    const newColumnName = prompt('Enter new column name:');
    if (newColumnName && !addedColumns.includes(newColumnName)) {
      setAddedColumns([...addedColumns, newColumnName]);
      dispatch(addProperty(newColumnName));
    }
  };

  const handleDeleteColumn = (columnNameToDelete) => {
    if (window.confirm(`Are you sure you want to delete the "${columnNameToDelete}" column?`)) {
      console.log('delete column');
      dispatch(deleteProperty(columnNameToDelete));
      setAddedColumns(addedColumns.filter((column) => column !== columnNameToDelete));
      handleClose();
    }
  };

  const handleDeleteRow = () => {
    // To Do
  };

  const handleDataCheck = () => {
    // To Do
  };

  const handleCellChange = (rowIndex, columnName, value) => {
    dispatch(setRegionProperty({ propertyName: columnName, value, id: rowIndex }));
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
                <TableCell key={index}>
                  {colName}
                  {isDeletable(colName) && (
                    <MoreVertIcon
                      onClick={(e) => handleClick(e, colName)}
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {displayedProperties.map((colName, colIndex) => (
                  <TableCell key={colIndex}>
                    <TextField
                      value={row[colName] || ''}
                      onChange={(e) => handleCellChange(rowIndex, colName, e.target.value)}
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
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleDeleteColumn(selectedColumn)}>Delete Column</MenuItem>
        </Menu>
        <TableButtons />
      </div>
    </div>
  );
}
