import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import TodoListIcon from './TodoListIcon';

export default function CreateContainer({ onTaskAdded }) {
    const [taskName, setTaskName] = React.useState('');

    const filterType = (event) => {
        setTaskName(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && taskName.trim() !== '') {
            const newTask = { id: localStorage.length, value: taskName, completed: false };
            localStorage.setItem(localStorage.length, JSON.stringify(newTask));
            onTaskAdded(newTask); // Call the callback function to update TodoContainer
            setTaskName('');
        }
    };

    return (
        <List sx={{ width: '100%', maxWidth: 550, bgcolor: '#25273c', marginBottom: '30px', paddingBottom: '0px', paddingTop: '0px' }} className='create-container'>
            <ListItem disablePadding>
                <ListItemButton role={undefined}>
                    <ListItemIcon>
                        <TodoListIcon />
                    </ListItemIcon>
                    <TextField
                        value={taskName}
                        placeholder="Create a new todo..."
                        onChange={filterType}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            style: {
                                fontFamily: 'Josefin Sans',
                                fontWeight: 'unset',
                                color: '#9395ab',
                                fontSize: '18px',
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                border: 'none',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                        }}
                        fullWidth
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );
}
