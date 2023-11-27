import React from 'react';
import '../../../styles/mapDataEditingPage.css';
import DataEditorLeftPane from './DataEditorLeftPane';
import DataEditorRightPane from './DataEditorRightPane';
import DataEditorTable from './DataEditorTable';

const MapDataEditor = () => {
  return (
    <div id="data-editing-page">
      <DataEditorLeftPane />
      <DataEditorTable />
      <DataEditorRightPane />
    </div>
  );
};

export default MapDataEditor;
