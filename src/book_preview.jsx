import List from "@mui/material/List";
import Avatar from '@mui/material/Avatar';
import { ListItem, ListItemText } from "@mui/material";

export function BookPreview(props) {
    return (
        <div className="book-preview">
            <List>
                <Avatar />
                <ListItem>
                    <ListItemText primary={props.book.title} secondary={props.book.author} />
                </ListItem>
            </List>
        </div>
    )
}