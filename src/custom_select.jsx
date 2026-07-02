import { styled } from '@mui/material/styles';
import { Autocomplete, TextField } from "@mui/material";

const MyAutocomplete = styled(Autocomplete)({
    minWidth: '250px',
    maxWidth: '500px',
    '& label.Mui-focused': {
        color: '#38525bd8',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#38525bd8'
        },
    },
});

export function CustomSelect(props) {
    return (
        <MyAutocomplete onClick={props.onClick}
            disablePortal
            limitTags={3}
            multiple={props.multiple}
            options={props.options}
            getOptionLabel={props.getOptionLabel}
            getOptionKey={props.getOptionKey}
            onChange={props.onChange}
            renderInput={(params) => <TextField {...params} label={props.label} />}
        />
    );
}