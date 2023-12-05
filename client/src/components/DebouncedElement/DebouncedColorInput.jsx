import { MuiColorInput } from 'mui-color-input';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedColorInput({
    format = "hex",
    value = "#000000",
    onChange }) {
    const [localValue, setLocalValue] = useDebounce(value, 200, (newLocalValue) => {
        onChange(newLocalValue);
    });

    return (
        <MuiColorInput
            format={format}
            value={localValue}
            onChange={(event, newLocalValue) => { setLocalValue(newLocalValue.hex); }}
        />
    );
}