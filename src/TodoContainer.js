import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';


const TodoContainer = () => {

    return (
        <div className="todo-container">
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary={`Complete JS Course`} />
                    </ListItemButton>
                </ListItem>
                <Divider className='divider' component="li" />
                <ListItem >
                    <ListItemButton>
                        <ListItemText primary={`Complete JS Course`} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
}

export default TodoContainer;