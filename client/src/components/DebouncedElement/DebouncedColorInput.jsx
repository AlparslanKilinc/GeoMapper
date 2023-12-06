import { MuiColorInput } from 'mui-color-input';
import { useDebounce } from '../../hooks/useDebounce';

export default function DebouncedColorInput({
    format = "hex",
    value = "#000000",
    label = "",
    inputProps = {},
    style = {},
    sx = {},
    onChange }) {
    const [localValue, setLocalValue] = useDebounce(value, 100, (newLocalValue) => {
        onChange(newLocalValue);
    });

    return (
        <MuiColorInput
            format={format}
            value={localValue}
            label={label}
            inputProps={inputProps}
            style={style}
            sx={sx}
            onChange={(event, newLocalValue) => { setLocalValue(newLocalValue.hex); }}
        />
    );
}