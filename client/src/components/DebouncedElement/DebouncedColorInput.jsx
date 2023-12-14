import { MuiColorInput } from 'mui-color-input';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedColorInput({ value, onChange, ...props }) {
  const [localValue, setLocalValue] = useDebounce(value, 100, (newLocalValue) => {
    if (newLocalValue !== value) {
      onChange(newLocalValue);
    }
  });

  return (
    <MuiColorInput
      value={localValue}
      onChange={(event, newColor) => {
        setLocalValue(newColor.hex);
      }}
      {...props}
    />
  );
}
