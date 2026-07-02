import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


const MyButton = styled(Button)({
    backgroundColor: '#38525bd8',
    height: '37px',
    '&:hover': {
        backgroundColor: '#38525b'
    }
});

export function CustomButton(props) {
    return (
        <MyButton variant="contained" onClick={props.onClick} startIcon={props.startIcon} endIcon={props.endIcon}>{
            props.text}
        </MyButton>
    );
}