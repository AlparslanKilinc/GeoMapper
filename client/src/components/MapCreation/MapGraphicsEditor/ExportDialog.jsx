import React, { useState, forwardRef, useImperativeHandle } from 'react';
import domtoimage from 'dom-to-image';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';

const ExportDialog = forwardRef((props, ref) => {
  const { title } = useSelector((state) => state.mapMetadata);
  const geojson = useSelector((state) => state.geojson);
  const mapGraphics = useSelector((state) => state.mapGraphics);
  const mapMetadata = useSelector((state) => state.mapMetadata);
  const mapStyles = useSelector((state) => state.mapStyles);

  const [exportDialogOpen, setExportDialogOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleOpenExportDialog: () => {
      setExportDialogOpen(true);
    }
  }));

  const handleCloseExportDialog = () => {
    setExportDialogOpen(false);
  };

  function handleExportChoice(exportType) {
    const mapElement = document.getElementById("mapContainer");
    const elementsToExclude = document.querySelectorAll('.exclude-from-capture');
    const elementsToInclude = document.querySelectorAll('.include-from-capture');

    const processElementsBeforeCapture = () => {
      elementsToExclude.forEach(el => {
        el.style.visibility = 'hidden';
      });
      elementsToInclude.forEach(el => {
        el.style.visibility = 'visible';
      });
    };

    const processElementsAfterCapture = () => {
      elementsToExclude.forEach(el => {
        el.style.visibility = 'visible';
      });
      elementsToInclude.forEach(el => {
        el.style.visibility = 'hidden';
      });
    };

    const exportOptions = {
      height: mapElement.offsetHeight * 4,
      width: mapElement.offsetWidth * 4,
      style: {
        transform: 'scale(4)',
        transformOrigin: 'top left',
        width: mapElement.offsetWidth + 'px',
        height: mapElement.offsetHeight + 'px'
      },
      quality: 2
    };

    if (mapElement) {
      processElementsBeforeCapture();
      setTimeout(() => {
        let exportFunction = exportType === 'jpg' ? domtoimage.toJpeg : domtoimage.toPng;
        let fileExtension = exportType === 'jpg' ? '.jpg' : '.png';

        exportFunction(mapElement, exportOptions)
          .then((dataUrl) => {
            processElementsAfterCapture();
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = (!title ? "GeoMapper" : title) + fileExtension;
            link.click();
            handleCloseExportDialog();
          })
          .catch((error) => {
            processElementsAfterCapture();
            handleCloseExportDialog();
            console.error('Error exporting map: ', error);
          });
      }, 100);
    }
  }

  function handleExportGeoJson() {
    const exportObject = {
      GeoMapper: "yessir",
      geojson: geojson,
      mapGraphics: mapGraphics,
      mapMetadata: mapMetadata,
      mapStyles: mapStyles,
    };

    const jsonString = JSON.stringify(exportObject, null, 2);

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    handleCloseExportDialog();
  }

  return (
    <Dialog open={exportDialogOpen} onClose={handleCloseExportDialog} aria-labelledby="export-dialog-title">
      <DialogTitle id="export-dialog-title">Please Select Export Format</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleExportChoice('png')} color="primary">PNG</Button>
        <Button onClick={() => handleExportChoice('jpg')} color="primary">JPG</Button>
        <Button onClick={() => handleExportGeoJson()} color="primary">JSON</Button>
      </DialogActions>
    </Dialog>
  );
});

export default ExportDialog;