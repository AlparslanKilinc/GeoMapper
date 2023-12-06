import TextField from '@mui/material/TextField';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedTextField({ value = '', onChange, ...props }) {
  const [localValue, setLocalValue] = useDebounce(value, 800, (newLocalValue) => {
    onChange(newLocalValue);
  });

  const handleLocalChange = (event) => {
    setLocalValue(event.target.value);
  };

  return <TextField value={localValue} onChange={handleLocalChange} {...props} />;
}
