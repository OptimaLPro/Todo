import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CustomCheckbox from './CustomCheckbox'; // Import the custom checkbox component
import tasksData from './tasks.json';

export default function CheckboxList() {
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (taskId) => () => {
        const currentIndex = checked.indexOf(taskId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(taskId);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: '#25273c', paddingBottom: '0px', paddingTop: '0px' }} className='todo-container'>
            {tasksData.tasks.map((task) => {
                const labelId = `checkbox-list-label-${task.id}`;
                const isTaskChecked = checked.includes(task.id);
                
                return (
                    <><ListItem
                        key={task.id}
                        secondaryAction={<IconButton edge="end" aria-label="comments">
                        </IconButton>}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(task.id)} >
                            <ListItemIcon>
                                <CustomCheckbox // Use the custom checkbox component
                                    edge="start"
                                    checked={checked.includes(task.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    sx={{ color: '#ffffff' }}
                                />
                            </ListItemIcon>

                            <ListItemText
                                id={labelId}
                                primary={task.name}
                                primaryTypographyProps={{ style: { fontFamily: 'Josefin Sans', fontWeight: 'unset',
                                color: isTaskChecked ? '#4f526b' : '#cacbe2',
                                textDecoration: isTaskChecked ? 'line-through' : 'none' } }} // Apply fontFamily using TypographyProps
                            />
                        </ListItemButton>
                    </ListItem>{tasksData.tasks.indexOf(task) !== tasksData.tasks.length - 1 && <Divider className='divider' component="li" />}</>


                );
            })}
        </List>
    );
}
