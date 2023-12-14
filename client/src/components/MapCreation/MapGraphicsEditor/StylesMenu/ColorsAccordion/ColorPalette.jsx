import { useSelector, useDispatch } from 'react-redux';
import { setColorPaletteIdx, setContinousColorScale } from '../../../../../redux-slices/mapStylesSlice';
import { Select, MenuItem, Box } from '@mui/material';
import * as d3 from 'd3';
import { addActionToPast } from '../../../../../redux-slices/undoRedoSlice';

export default function ColorPaletteSelector(props) {
  const dispatch = useDispatch();
  const { colorPalette, colorPaletteIdx } = useSelector((state) => state.mapStyles);
  const regions = useSelector((state) => state.mapGraphics.regions);
  const colorByProperty = useSelector((state) => state.mapGraphics.colorByProperty);

  const handleChange = (event) => {
    const newColorPaletteIdx = event.target.value;
    const data = regions.map((region) => region[colorByProperty]);
    const colorScale = d3.scaleLinear().domain([d3.min(data), d3.max(data)]).range(colorPalette[newColorPaletteIdx]);
    const oldColorScale = d3.scaleLinear().domain([d3.min(data), d3.max(data)]).range(colorPalette[colorPaletteIdx]);

    dispatch(addActionToPast({
      undoActions: [{ actionCreator: setContinousColorScale, args: [data.map((d) => oldColorScale(d))] },
      { actionCreator: setColorPaletteIdx, args: [colorPaletteIdx] }],
      redoActions: [{ actionCreator: setContinousColorScale, args: [data.map((d) => colorScale(d))] },
      { actionCreator: setColorPaletteIdx, args: [newColorPaletteIdx] }]
    }));
    dispatch(setContinousColorScale(data.map((d) => colorScale(d))));
    dispatch(setColorPaletteIdx(newColorPaletteIdx));
  };

  // TODO: Make highlight color darker
  return (
    <Select
      labelId="color-palette-select-label"
      id="color-palette-select"
      value={colorPaletteIdx}
      label="Select palette"
      onChange={handleChange}
      style={{ width: '100%' }}
    >
      {colorPalette.map((palette, idx) => (
        <MenuItem value={idx} key={idx}>
          <Box
            sx={{
              width: '100%',
              height: '20px',
              backgroundImage: `linear-gradient(to right, ${palette.join(', ')})`
            }}
          />
        </MenuItem>
      ))}
    </Select>
  );
};