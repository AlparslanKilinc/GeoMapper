import IconButton from '@mui/material/IconButton';
import { ButtonGroup } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import SquareIcon from '@mui/icons-material/Square';
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import TriangleIcon from '@mui/icons-material/ChangeHistory';
import TriangleOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import HexagonIcon from '@mui/icons-material/Hexagon';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { useSelector } from 'react-redux';
import { changeSelectedShape } from '../../../redux-slices/mapStylesSlice';
import { useDispatch } from 'react-redux';
function ShapeButtonGroup() {
  const shape = useSelector((state) => state.mapStyles.shape);
  const dispatch = useDispatch();
  const handleClick = (button) => {
    dispatch(changeSelectedShape(button));
  };

  return (
    <ButtonGroup variant="contained" >
      <IconButton
        onClick={() => handleClick('circle')}
        color={shape === 'circle' ? 'primary' : 'default'}
        size="small"
      >
        {shape === 'circle' ? <CircleIcon /> : <CircleOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={() => handleClick('square')}
        color={shape === 'square' ? 'primary' : 'default'}
        size="small"
      >
        {shape === 'square' ? <SquareIcon /> : <SquareOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={() => handleClick('triangle')}
        color={shape === 'triangle' ? 'primary' : 'default'}
        size="small"
      >
        {shape === 'triangle' ? <TriangleIcon /> : <TriangleOutlinedIcon />}
      </IconButton>
      <IconButton
        onClick={() => handleClick('hexagon')}
        color={shape === 'hexagon' ? 'primary' : 'default'}
        size="small"
      >
        {shape === 'hexagon' ? <HexagonIcon /> : <HexagonOutlinedIcon />}
      </IconButton>

      <IconButton
        onClick={() => handleClick('star')}
        color={shape === 'star' ? 'primary' : 'default'}
        size="small"
      >
        {shape === 'star' ? <StarIcon /> : <StarOutlineOutlinedIcon />}
      </IconButton>
    </ButtonGroup>
  );
}

export default ShapeButtonGroup;
