import { Delete, Edit } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { color } from '@mui/system';

const MyDelete = styled(Delete)({
    ':hover': {
        color: '#000000da',
        cursor: 'pointer'
    }
});

const MyEdit = styled(Edit)({
    ':hover': {
        color: '#000000da',
        cursor: 'pointer'
    }
});

export function CustomeIcon(props) {
    return (
        <div className='book-btns'>
            {props.type == "del" ? <MyDelete color='action' onClick={props.onClick} /> :
                <MyEdit color='action' onClick={props.onClick} />}

        </div>
    )
}