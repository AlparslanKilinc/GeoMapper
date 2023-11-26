import domtoimage from 'dom-to-image';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ExportDialog({ open, onClose }) {
  const { title } = useSelector((state) => state.mapMetadata);

  function handleExportChoice(exportType) {
    const mapElement = document.getElementById("mapContainer");
    const elementsToExclude = document.querySelectorAll('.exclude-from-capture');

    const hideElementsForCapture = () => {
      elementsToExclude.forEach(el => {
        el.style.display = 'none';
      });
    };

    const showElementsAfterCapture = () => {
      elementsToExclude.forEach(el => {
        el.style.display = '';
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
      hideElementsForCapture();
      setTimeout(() => {
        let exportFunction = exportType === 'jpg' ? domtoimage.toJpeg : domtoimage.toPng;
        let fileExtension = exportType === 'jpg' ? '.jpg' : '.png';

        exportFunction(mapElement, exportOptions)
          .then((dataUrl) => {
            showElementsAfterCapture();
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = title + fileExtension;
            link.click();
            onClose();
          })
          .catch((error) => {
            showElementsAfterCapture();
            onClose();
            console.error('Error exporting map: ', error);
          });
      }, 100);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="export-dialog-title">
      <DialogTitle id="export-dialog-title">Please Select Export Format</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleExportChoice('png')} color="primary">PNG</Button>
        <Button onClick={() => handleExportChoice('jpg')} color="primary">JPG</Button>
      </DialogActions>
    </Dialog>
  );
}