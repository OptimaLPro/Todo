import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import tasksData from './tasks.json';

const ListFilter = ({ checked, setChecked, handleToggle, tasks, setTasks }) => {
    const filter = (e) => {
        const filter = e.target.innerText.toLowerCase();
        let newChecked = [];
    
        if (filter === 'all') {
            newChecked = tasks.filter((task) => task.completed).map((task) => task.id);
        } else if (filter === 'active') {
            tasksData.tasks = tasksData.tasks.filter((task) => !checked.includes(task.id));
        } else if (filter === 'completed') {
            tasksData.tasks = tasksData.tasks.filter((task) => checked.includes(task.id));
        }
    
        setChecked(newChecked);
    };
    

    return (
        <div className='list-filter'>
            <ListItemText primary={`All`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px' , cursor: 'pointer'} }} onClick={filter} />
            <ListItemText primary={`Active`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px' , cursor: 'pointer'} }} onClick={filter} />
            <ListItemText primary={`Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' , cursor: 'pointer'} }} onClick={filter} />
        </div>
    );
};

export default ListFilter;
