import React, { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import {
  startLoadingGeojson,
  stopLoadingGeojson,
  uploadGeoJSON
} from '../../redux-slices/geoJSONSlice';
import { openShp, read } from 'shapefile';
import jszip from 'jszip';
import toGeoJSON from 'togeojson';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const OutlineFileUploader = () => {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState(null);
  const [error, setError] = useState(null);

  const processGeoJSON = (file) => {
    const reader = createFileReader((fileData) => {
      const geojsonData = JSON.parse(fileData);
      dispatch(uploadGeoJSON(geojsonData));
    });
    reader.readAsText(file);
  };

  const processKML = (file) => {
    const reader = createFileReader((fileData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(fileData, 'text/xml');
      const geojsonData = toGeoJSON.kml(xmlDoc);
      dispatch(uploadGeoJSON(geojsonData));
    });
    reader.readAsText(file);
  };

  const processSingleShp = (file) => {
    const reader = createFileReader(async (fileData) => {
      const source = await openShp(fileData);
      const featureCollection = { type: 'FeatureCollection', features: [] };
      let result;
      while ((result = await source.read()).done === false) {
        featureCollection.features.push(result.value);
      }
      dispatch(uploadGeoJSON(geojsonData));
    });
    reader.readAsArrayBuffer(file);
  };

  const processShpZip = async (file) => {
    try {
      const JSZip = await jszip();
      const zipFile = await JSZip.loadAsync(file);
      const { shpFiles, dbfFiles } = await readZipFiles(zipFile);
      for (const shpFilename in shpFiles) {
        const dbfFilename = shpFilename.replace('.shp', '.dbf');
        const geojsonData = await read(shpFiles[shpFilename], dbfFiles[dbfFilename]);
        dispatch(uploadGeoJSON(geojsonData));
        break; // Process only the first SHP/DBF pair found
      }
    } catch (e) {
      dispatch(stopLoadingGeojson());
      setError('An error occurred while processing the zip file.');
    }
  };

  const readZipFiles = async (zipFile) => {
    const shpFiles = {};
    const dbfFiles = {};
    await Promise.all(
      Object.keys(zipFile.files).map(async (filename) => {
        const fileObject = zipFile.file(filename);
        if (fileObject) {
          const contentArrayBuffer = await fileObject.async('arraybuffer');
          if (filename.endsWith('.shp')) {
            shpFiles[filename] = contentArrayBuffer;
          } else if (filename.endsWith('.dbf')) {
            dbfFiles[filename] = contentArrayBuffer;
          }
        }
      })
    );
    return { shpFiles, dbfFiles };
  };

  const createFileReader = (callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    return reader;
  };

  const fileHandlers = {
    '.json': processGeoJSON,
    '.geojson': processGeoJSON,
    '.zip': processShpZip,
    '.shp': processSingleShp,
    '.kml': processKML
  };

  const handleFileChange = useCallback((event) => {
    const files = event.target.files;
    setWarning(null);
    setError(null);
    if (files.length > 0) {
      dispatch(startLoadingGeojson());
    }

    Array.from(files).forEach((file) => {
      const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/);
      if (fileExtension && fileHandlers[fileExtension[0]]) {
        fileHandlers[fileExtension[0]](file);
      } else {
        dispatch(stopLoadingGeojson());
        setWarning(`Unsupported file: ${file.name}`);
      }
    });
  }, []);

  return (
    <div>
      <Button
        startIcon={<CloudUploadIcon />}
        className="upload-file-button"
        component="label"
        variant="outlined"
        style={{ color: 'black', borderColor: 'black' }}
      >
        Upload a map
        <VisuallyHiddenInput
          type="file"
          multiple
          className="file-input"
          onChange={handleFileChange}
          accept=".json, .geojson, .kml, .zip"
        />
      </Button>
      {warning && <p className="warning">{warning}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default OutlineFileUploader;
