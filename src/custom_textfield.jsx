import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";

const MyTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#38525bd8',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#38525bd8'
        },
    },
});

export function CustomField(props) {
    return (
        <MyTextField variant="outlined"
            label={props.label}
            onChange={props.onChange}
            rows={props.rows}
            multiline={props.multiline}
            defaultValue={props.defaultValue}
            value={props.value}
            required={props.required}
            type={props.type}
        />
    );
}