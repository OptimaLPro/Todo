import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';

export default function CreateContainer({ onTaskAdded, darkmode }) {
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
        <List sx={{
            width: '100%', maxWidth: 550, marginBottom: '30px', paddingBottom: '0px', paddingTop: '0px',
            bgcolor: darkmode ? '#ffffff' : '#25273c',
            transition: 'background-color 0.3s ease-in-out'

        }} className='create-container'>
            <ListItem disablePadding>
                <ListItemButton role={undefined}>
                    <ListItemIcon>
                        <div className='iconStyle' style={{ borderWidth: '2px', borderColor: darkmode ? '#e8e8ea' : '#4c4f6e', }} />
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
                                color: '#7b7a7e',
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
                            input: {
                                "&::placeholder": {    // <----- Add this.
                                    opacity: 0.8,
                                },
                            }
                        }}
                        fullWidth
                    />
                </ListItemButton>
            </ListItem>
        </List>
    );
}
