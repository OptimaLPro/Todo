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
import ListFilter from './ListFilter';

export default function CheckboxList() {
    const [checked, setChecked] = React.useState(tasksData.tasks.filter((task) => task.completed).map((task) => task.id));
    const [tasks, setTasks] = React.useState(tasksData.tasks);

    const handleToggle = (taskId) => () => {
        const currentIndex = checked.indexOf(taskId);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(taskId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked);
        setChecked(newChecked);
    };

    const deleteCompleted = () => {
        setChecked([]);
        tasksData.tasks = tasksData.tasks.filter((task) => !checked.includes(task.id));
        setChecked(tasksData.tasks.filter((task) => task.completed).map((task) => task.id));
    };

    return (
        <List sx={{ width: '100%', maxWidth: 550, bgcolor: '#25273c', paddingBottom: '0px', paddingTop: '0px' }} className='todo-container'>
            {tasksData.tasks.map((task) => {
                const labelId = `checkbox-list-label-${task.id}`;
                const isTaskChecked = checked.includes(task.id);

                return (
                    <><ListItem
                        key={task.id}
                        disablePadding>
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
                                primaryTypographyProps={{
                                    style: {
                                        fontFamily: 'Josefin Sans', fontWeight: 'unset',
                                        color: isTaskChecked ? '#4f526b' : '#cacbe2',
                                        textDecoration: isTaskChecked ? 'line-through' : 'none'
                                    }
                                }} // Apply fontFamily using TypographyProps
                            />
                        </ListItemButton>
                    </ListItem>
                        <Divider className='divider' component="li" />
                    </>
                );
            })}
            <ListItem className='action-bar'>
                <ListItemText primary={`${tasksData.tasks.length - checked.length} items left`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' } }} />
                <ListFilter checked={checked} setChecked={setChecked} handleToggle={() => handleToggle} tasks={tasks} setTasks={setTasks} />
                <ListItemText primary={`Clear Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', textAlign: "right", cursor: "pointer" } }} onClick={deleteCompleted} />
            </ListItem>
        </List>
    );
}
