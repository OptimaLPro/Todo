import React from 'react';
import { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';

const ListFilter = ({setTasks}) => {

    const filter = (e) => {
        const filter = e.target.innerText.toLowerCase();

        const storedTasks = [];
        for (let i = 0; i < localStorage.length; i++) {
            if (isNaN(localStorage.key(i))) continue;
            const taskKey = parseInt(localStorage.key(i));
            const taskValue = JSON.parse(localStorage.getItem(taskKey));
            if (filter === 'all') {
                const storedTask = { id: taskKey, value: taskValue.value, completed: taskValue.completed };
                storedTasks.push(storedTask);
            } else if (filter === 'active') {
                if (taskValue.completed === false) {
                    const storedTask = { id: taskKey, value: taskValue.value, completed: taskValue.completed };
                    storedTasks.push(storedTask);
                }
            } else if (filter === 'completed') {
                if (taskValue.completed === true) {
                    const storedTask = { id: taskKey, value: taskValue.value, completed: taskValue.completed };
                    storedTasks.push(storedTask);
                }
            }

        }
        // storedTasks.sort((a, b) => a.id - b.id);
        setTasks(storedTasks);
    };


    return (
        <div className='list-filter'>
            <ListItemText primary={`All`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px', cursor: 'pointer' } }} onClick={filter} />
            <ListItemText primary={`Active`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px', cursor: 'pointer' } }} onClick={filter} />
            <ListItemText primary={`Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', cursor: 'pointer' } }} onClick={filter} />
        </div>
    );
};

export default ListFilter;
