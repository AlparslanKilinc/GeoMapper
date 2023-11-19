import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn, addRow, modifyCell, checkMatch } from '../../redux-slices/mapDataEditorSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Divider,
  List,
  ListItem,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Typography, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles/mapDataEditingPage.css';
import { setRegionProperty } from '../../redux-slices/mapGraphicsDataSlice';
import PropertySelector from '../MapCreation/propertySelector';

const BaseMapDataEditor = (config) => {
  return (props) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.mapDataEditor.data);
    const isMatchSuccessful = useSelector((state) => state.mapDataEditor.isMatchSuccessful);
    const { propertyNames, regions, points, colorByProperty, nameByProperty } = useSelector(
      (state) => state.mapGraphics
    );
    const { mapGraphicsType } = useSelector((state) => state.mapMetadata);

    let dataSource = regions;

    if (mapGraphicsType !== 'Choropleth Map') {
      dataSource = points;
    }

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
      if (mapGraphicsType === 'Choropleth Map')
        dispatch(setRegionProperty({ propertyName: columnName, value, id: rowIndex }));
    };

    const handleCheck = () => {
      dispatch(checkMatch());
    };

    const handleDelete = () => {};

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
      <div id="table-container" style={{ overflow: 'auto' }}>
        <Table size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {propertyNames.map((colName, index) => (
                <TableCell key={index}>{colName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row, rowIndex) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {config.renderCustomizedTableButtons
          ? config.renderCustomizedTableButtons()(handleAddColumn, handleDelete)
          : renderDefaultTableButtons()}
      </div>
    );

    let color = {
      propertyName: 'color',
      value: colorByProperty
    };

    let name = {
      propertyName: 'name',
      value: nameByProperty
    };
    let properties = [name, color];

    let propertySelectors = properties.map((selectorConfig) => {
      return (
        <PropertySelector propertyName={selectorConfig.propertyName} value={selectorConfig.value} />
      );
    });

    const renderMatchPanel = () => (
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
        {propertySelectors}
      </Box>
    );

    return (
      <div id="data-editing-page">
        <div id="data-editing-page-left">
          <div className="header-primary">
            <h2>{config.mapGraphicsType}</h2>
            <Divider style={{ width: '50%' }} />
          </div>

          <h3 className="secondary-title">add data</h3>
          <div className="actions" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <LoadingButton
              startIcon={<CloudUploadIcon />}
              variant="outlined"
              style={{ color: 'black', borderColor: 'black' }}
            >
              upload map
            </LoadingButton>

            <LoadingButton
              startIcon={<AutoFixHighIcon />}
              variant="outlined"
              style={{ color: 'black', borderColor: 'black' }}
            >
              random data
            </LoadingButton>
          </div>

          <TextField
            variant="outlined"
            label="Search for places"
            sx={{
              width: '80%'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div id="data-editing-page-mid">{renderTable()}</div>
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
            <Box
              sx={{ display: 'flex', alignItems: 'center', padding: '0.5em', fontSize: '0.8em' }}
            >
              <Typography variant="body2" className="normalText" color="#40e0d0">
                √ All map regions were matched!
              </Typography>
            </Box>
          )}
        </div>
      </div>
    );
  };
};

export default BaseMapDataEditor;
