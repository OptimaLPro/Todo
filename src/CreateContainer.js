import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import TodoListIcon from './TodoListIcon';
import CreateTask from './CreateTask';

export default function CheckboxList() {
    const [taskName, setTaskName] = React.useState('');

    const handleTaskNameChange = (event) => {
        setTaskName(event.target.value);
    };

    const handleCreateTask = () => {
        // Handle creating the task with the entered task name
        console.log('Creating task:', taskName);
        // Reset taskName after creating the task
        setTaskName('');
    };

    return (
        <List sx={{ width: '100%', maxWidth: 550, bgcolor: '#25273c', marginBottom: '25px', paddingBottom: '0px', paddingTop: '0px' }} className='create-container'>
            <ListItem
                disablePadding
            >
                <ListItemButton role={undefined}>
                    <ListItemIcon>
                        <TodoListIcon />
                    </ListItemIcon>

                    <TextField
                        value={taskName}
                        placeholder="Create a new todo..."
                        onChange={handleTaskNameChange}
                        InputProps={{
                            style: {
                                fontFamily: 'Josefin Sans',
                                fontWeight: 'unset',
                                color: '#9395ab'
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                border: 'none', // Remove the black border
                                '& fieldset': {
                                    border: 'none', // Remove the black border on hover
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none', // Remove the blue focus outline
                                },
                            },
                        }}
                        fullWidth
                        
                    />

                    <CreateTask onClick={handleCreateTask} />
                </ListItemButton>
            </ListItem>
        </List>
    );
}
