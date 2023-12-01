import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { useSelector } from 'react-redux';
import L from 'leaflet';

const LabelLayer = ({ geoJSONRef }) => {
  const [labels, setLabels] = useState([]);

  const regions = useSelector((state) => state.mapGraphics.regions);
  const labelByProperty = useSelector((state) => state.mapGraphics.labelByProperty);

  useEffect(() => {
    if (geoJSONRef.current) {
      const newLabels = [];
      geoJSONRef.current.eachLayer((layer) => {
        const feature = layer.feature;
        const index = feature.properties.regionIdx; // Ensure your features have an 'index' property
        const regionDetails = regions[index];
        const labelText = regionDetails[labelByProperty];

        const labelIcon = L.divIcon({
          className: 'map-label',
          html: `<p>${labelText}</p>`,
          iconSize: [100, 40]
        });

        const position = layer.getBounds().getCenter();

        newLabels.push(
          <Marker key={position.lat + '#' + position.lng} position={position} icon={labelIcon} />
        );
      });
      setLabels(newLabels);
    }
  }, [geoJSONRef, regions, labelByProperty]);

  return <div>{labels}</div>;
};

export default LabelLayer;
