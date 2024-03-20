import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import tasksData from './tasks.json';

const ListFilter = ({ checked, setChecked }) => {

    const filter = (e) => {
        const filter = e.target.innerText.toLowerCase();
        const tasks = tasksData.tasks;
        const taskIds = tasks.map((task) => task.id);
        const newChecked = [];

        if (filter === 'all') {
            newChecked.push(...taskIds);
        } else if (filter === 'active') {
            tasks.forEach((task) => {
                if (!task.completed) {
                    newChecked.push(task.id);
                }
            });
        } else if (filter === 'completed') {
            tasks.forEach((task) => {
                if (task.completed) {
                    newChecked.push(task.id);
                }
            });
        }

        setChecked(newChecked);
    }

    return (
        <div className='list-filter'>
            <ListItemText primary={`All`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px' } }} onClick={filter} />
            <ListItemText primary={`Active`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186', marginRight: '20px' } }} onClick={filter} />
            <ListItemText primary={`Completed`} primaryTypographyProps={{ style: { fontSize: '30', fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' } }} onClick={filter} />
        </div>
    );
}

export default ListFilter;