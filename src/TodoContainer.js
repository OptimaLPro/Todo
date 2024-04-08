import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CustomCheckbox from './CustomCheckbox'; // Import the custom checkbox component
import ListFilter from './ListFilter';

export default function CheckboxList(newTasks) {
    const [checked, setChecked] = React.useState(() => {
        return [];
        // const storedChecked = localStorage.getItem('checked') ? localStorage.getItem('checked').split(',') : [];
        // console.log('Stored checked:', storedChecked);
        // return storedChecked;
    });

    const [tasks, setTasks] = React.useState(() => {
        const storedTasks = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (isNaN(localStorage.key(i))) continue;
            const taskKey = parseInt(localStorage.key(i));
            const taskValue = JSON.parse(localStorage.getItem(taskKey));
            const storedTask = { id: taskKey, value: taskValue.value, completed: taskValue.completed };
            storedTasks.push(storedTask);
        }
        storedTasks.sort((a, b) => a.id - b.id);
        return storedTasks;
    });


    // useEffect(() => {
    //     // localStorage.setItem('checked', checked);
    //     console.log('Checked:', checked);
    // }, [checked]);

    useEffect(() => {
        newTasks = newTasks.newTasks || [];
        if (newTasks.length > 0) {
            console.log('New task:', newTasks[newTasks.length - 1]);
            const updatedTasks = [...tasks, newTasks[newTasks.length - 1]];
            setTasks(updatedTasks);
        }
    }, [newTasks]);

    const handleToggle = (taskId) => () => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);

        for (let i = 0; i < localStorage.length; i++) {
            if (isNaN(localStorage.key(i))) continue;
            const taskKey = parseInt(localStorage.key(i));
            const taskValue = JSON.parse(localStorage.getItem(taskKey));
            if (taskValue.id === taskId) {
                taskValue.completed = !taskValue.completed;
                // taskValue.checked = !taskValue.checked;
                localStorage.setItem(taskKey, JSON.stringify(taskValue));
                console.log('Task value:', taskValue);
            }
        }
    };

    const deleteCompleted = () => {
        const updatedTasks = tasks.filter((task) => !task.completed);

        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && !isNaN(key)) {
                const taskValue = JSON.parse(localStorage.getItem(key));
                console.log('Task value:', taskValue);
                if (taskValue && taskValue.completed) {
                    console.log('Removing task:', taskValue);
                    localStorage.removeItem(key);
                    console.log(localStorage.length);
                }
            }
        }

        setTasks(updatedTasks);
        setChecked([]);
    };


    return (
        <List sx={{ width: '100%', maxWidth: 550, bgcolor: '#25273c', paddingBottom: '0px', paddingTop: '0px' }} className='todo-container'>
            {tasks.map((task) => {
                const labelId = `checkbox-list-label-${task.id}`;
                // const isTaskChecked = checked.includes(task.id);
                const isTaskChecked = task.completed;

                return (
                    <React.Fragment key={task.id}>
                        <ListItem disablePadding>
                            <ListItemButton role={undefined} onClick={handleToggle(task.id)}>
                                <ListItemIcon>
                                    <CustomCheckbox
                                        edge="start"
                                        checked={isTaskChecked}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        sx={{ color: '#ffffff' }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    id={labelId}
                                    primary={task.value}
                                    primaryTypographyProps={{
                                        style: {
                                            fontFamily: 'Josefin Sans', fontWeight: 'unset',
                                            color: isTaskChecked ? '#4f526b' : '#cacbe2',
                                            textDecoration: isTaskChecked ? 'line-through' : 'none',
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                        <Divider className='divider' component="li" />
                    </React.Fragment>
                );
            })}
            <ListItem className='action-bar'>
                <ListItemText primary={`${tasks.length - checked.length} items left`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' } }} />
                <ListFilter setTasks={setTasks}/>
                <ListItemText primary={`Clear Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', textAlign: "right", cursor: "pointer" } }} onClick={deleteCompleted} />
            </ListItem>
        </List>
    );
}
