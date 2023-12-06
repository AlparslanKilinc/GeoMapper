import React from 'react';
import { Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { setLabelPositionByIdx } from '../../../../redux-slices/mapStylesSlice';
import { useDispatch } from 'react-redux';

const LabelLayer = () => {
  // we need the geometric features to calculate where to place the label
  const dispatch = useDispatch();
  const features = useSelector((state) => state.geojson.geojson.geoJSON.features);
  // we also need the regions from mapgraphics slice
  const regions = useSelector((state) => state.mapGraphics.regions);

  const defaultLabelColor = useSelector((state) => state.mapStyles.defaultLabelColor);
  const defaultLabelFont = useSelector((state) => state.mapStyles.defaultLabelFont);
  const defaultLabelSize = useSelector((state) => state.mapStyles.defaultLabelSize);

  // we also need labelbyproperty
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);

  const labels = useSelector((state) => state.mapStyles.labels);

  const handleDragEnd = (event, idx) => {
    const { lat, lng } = event.target.getLatLng();
    const position = [lat, lng];
    // Dispatch an action to update the position in your Redux store
    dispatch(setLabelPositionByIdx({ idx, position }));
  };

  const labelIconDivs = features.map((feature, index) => {
    const regionDetails = regions[index];
    const labelText = regionDetails[labelByProperty];

    if (labels.length === 0) return null;

    let { position, color, size, font } = labels[index];

    if (!color) color = defaultLabelColor;
    if (!size) size = defaultLabelSize;
    if (!font) font = defaultLabelFont;

    // Construct the style string
    const style = `color: ${color}; font-size: ${size}px; font-family: ${font};`;

    // Modify the labelIcon with the new style
    const labelIcon = L.divIcon({
      className: 'map-label',
      html: `<p style="${style}">${labelText}</p>`,
      iconSize: [100, 40]
    });

    if (position) {
      const [lat, lon] = position;

      return (
        <Marker
          key={lat + '#' + lon}
          position={position}
          icon={labelIcon}
          draggable={true}
          eventHandlers={{
            dragend: (event) => handleDragEnd(event, index)
          }}
        />
      );
    }

    return null;
  });

  return <div>{labelIconDivs}</div>;
};

export default LabelLayer;
