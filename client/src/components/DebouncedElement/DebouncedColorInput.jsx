import { MuiColorInput } from 'mui-color-input';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedColorInput({ value, onChange, ...props }) {
  const [localValue, setLocalValue] = useDebounce(value, 100, (newLocalValue) => {
    onChange(newLocalValue);
  });

  return (
    <MuiColorInput
      value={localValue}
      {...props}
      onChange={(event, newLocalValue) => {
        setLocalValue(newLocalValue.hex);
      }}
    />
  );
}
