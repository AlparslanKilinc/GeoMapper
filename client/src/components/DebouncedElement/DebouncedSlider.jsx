import { Slider } from '@mui/material';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedSlider({
    min = 0,
    max = 100,
    step = 1,
    value = 0,
    onChange }) {
    const [localValue, setLocalValue] = useDebounce(value, 200, (newLocalValue) => {
        onChange(newLocalValue);
    });

    return (
        <Slider
            min={min}
            max={max}
            step={step}
            value={localValue}
            onChange={(event, newLocalValue) => { setLocalValue(newLocalValue); }}
        />
    );
}