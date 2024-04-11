import React, { useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CustomCheckbox from './CustomCheckbox';
import ListFilter from './ListFilter';
import { Tilt } from 'react-tilt'

export default function CheckboxList({ newTasks, darkmode }) {
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

    useEffect(() => {
        if (darkmode) {
            console.log('light mode');
        } else {
            console.log('dark mode');
        }
    }, [darkmode
    ]);

    useEffect(() => {
        newTasks = newTasks || [];
        if (newTasks.length > 0) {
            const updatedTasks = [...tasks, newTasks[newTasks.length - 1]];
            setTasks(updatedTasks);
        }
    }, [newTasks]);

    const taskClickHandle = (taskId) => () => {
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
                localStorage.setItem(taskKey, JSON.stringify(taskValue));
            }
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedTasks = Array.from(tasks);
        const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, reorderedItem);

        setTasks(reorderedTasks);

        localStorage.clear();
        reorderedTasks.forEach((task, index) => {
            localStorage.setItem(index, JSON.stringify(task));
        });

        console.log(reorderedTasks);
    };

    const clearCompleted = () => {
        const updatedTasks = tasks.filter((task) => !task.completed);

        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && !isNaN(key)) {
                const taskValue = JSON.parse(localStorage.getItem(key));
                if (taskValue && taskValue.completed) {
                    localStorage.removeItem(key);
                }
            }
        }
        setTasks(updatedTasks);
    };

    const listItemRef = useRef(null);
    const isHovering = useRef(false);

    const itemHoverHandle = () => {
        if (!isHovering.current) {
            console.log('Item hovered!');
            isHovering.current = true;
        }
    };

    const itemLeaveHandle = () => {
        console.log('Item left!');
        isHovering.current = false;
    };

    const completedFalseTasksLength = tasks.filter(task => !task.completed).length;

    const defaultOptions = {
        reverse: false,  // reverse the tilt direction
        max: 20,     // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        scale: 1.04,    // 2 = 200%, 1.5 = 150%, etc..
        speed: 1000,   // Speed of the enter/exit transition
        transition: true,   // Set a transition on enter/exit.
        axis: null,   // What axis should be disabled. Can be X or Y.
        reset: true,    // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <List
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                            width: '100%', maxWidth: 550, paddingBottom: '0px', paddingTop: '0px',
                            bgcolor: darkmode ? '#ffffff' : '#25273c',
                            transition: 'background-color 0.3s ease-in-out'
                        }}
                        className={'todo-container-light'}
                    >
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={String(task.id)} index={index} >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Tilt options={defaultOptions}>
                                            <ListItem
                                                ref={listItemRef}
                                                disablePadding
                                                className='listStyle'
                                                classes={{ root: 'listItemHovered' }}
                                                onMouseEnter={itemHoverHandle}
                                                onMouseLeave={itemLeaveHandle}
                                            >
                                                <ListItemButton role={undefined} onClick={taskClickHandle(task.id)}>
                                                    <ListItemIcon>
                                                        <CustomCheckbox
                                                            edge="start"
                                                            taskkey={task.id}
                                                            checked={task.completed}
                                                            darkmode={darkmode}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${task.id}` }}
                                                            sx={{ color: '#ffffff' }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        id={`checkbox-list-label-${task.id}`}
                                                        primary={task.value}
                                                        primaryTypographyProps={{
                                                            style: {
                                                                fontFamily: 'Josefin Sans',
                                                                fontWeight: '600',
                                                                // color: task.completed ? '#4f526b' : '#cacbe2',
                                                                textDecoration: task.completed ? 'line-through' : 'none',

                                                                color: task.completed
                                                                    ? darkmode
                                                                        ? '#cacbe2' // Task not completed and dark mode on
                                                                        : '#4f526b' // Task completed and dark mode off
                                                                    : darkmode
                                                                        ? '#4f526b' // Task completed and dark mode on
                                                                        : '#cacbe2',// Task not completed and dark mode off
                                                                transition: 'color 0.3s ease-in-out',

                                                            }
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        </Tilt>
                                        <Divider className='divider' component="li" sx={{ bgcolor: darkmode ? '#ffffff' : '#474958', transition: 'background-color 0.3s ease-in-out' }} />
                                    </div>
                                )}
                            </Draggable>
                ))}
                {provided.placeholder}
                <ListItem className='action-bar'>
                    <ListItemText primary={`${completedFalseTasksLength} items left`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' } }} className='footer-text' />
                    <ListFilter setTasks={setTasks} className='footer-text' />
                    <ListItemText primary={`Clear Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', textAlign: "right", cursor: "pointer" } }} onClick={clearCompleted} className='footer-text' />
                </ListItem>
            </List>
                )}
        </Droppable>

        </DragDropContext >
    );
}
