import React, { useState } from 'react';
import '../../../styles/mapDataEditingPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setRegionProperty } from '../../../redux-slices/mapGraphicsDataSlice';

export default function DataEditorTable() {
  const dispatch = useDispatch();
  const { regions, points, valueByProperty, colorByProperty, nameByProperty, LatByProperty, LonByProperty } =
    useSelector((state) => state.mapGraphics);
  const { mapGraphicsType } = useSelector((state) => state.mapMetadata);
  let propertyNames = [];
  let data = [];

  if (mapGraphicsType === 'Choropleth Map') {
    propertyNames = [nameByProperty, colorByProperty];
    data = regions;
  } else {
    propertyNames = [nameByProperty, LatByProperty, LonByProperty];
    data = points;
  }

  const handleAddColumn = () => {
    // To Do
  };

  const handleDeleteColumn = () => {
    // To Do
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

      <LoadingButton
        variant="outlined"
        style={{ color: 'red', borderColor: 'red' }}
        onClick={handleDeleteColumn}
      >
        Delete Column
      </LoadingButton>
    </div>
  );

  return (
    <div id="data-editing-page-mid">
      <div id="table-container" style={{ overflow: 'auto', padding: '1rem' }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {propertyNames.map((colName, index) => (
                <TableCell key={index}>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {propertyNames.map((colName, colIndex) => (
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
        <TableButtons />
      </div>
    </div>
  );
}
