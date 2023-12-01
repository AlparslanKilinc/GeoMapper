// const addLabelToMap = (layer, labelText) => {
//   const label = L.marker(layer.getBounds().getCenter(), {
//     icon: L.divIcon({
//       className: 'map-label',
//       html: labelText,
//       iconSize: [100, 40]
//     })
//   });

//   label.on('click', (e) => {
//     L.DomEvent.stopPropagation(e);
//     layer.fire('click');
//   });

//   label.addTo(map);
//   setLabels((prev) => new Map(prev).set(layer, label));
// };

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

  // we also need labelbyproperty
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);

  const labelPositions = useSelector((state) => state.mapStyles.labelPositions);

  const handleDragEnd = (event, idx) => {
    const { lat, lng } = event.target.getLatLng();
    const position = [lat, lng];
    // Dispatch an action to update the position in your Redux store
    dispatch(setLabelPositionByIdx({ idx, position }));
  };

  const labels = features.map((feature, index) => {
    const regionDetails = regions[index];
    const labelText = regionDetails[labelByProperty];

    // the icon can be controlled by some redux state
    const labelIcon = L.divIcon({
      className: 'map-label',
      html: `<p>${labelText}</p>`,
      iconSize: [100, 40]
    });

    const position = labelPositions[index];

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

  return <div>{labels}</div>;
};

export default LabelLayer;
