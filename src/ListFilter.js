import React from 'react';
import { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import tasksData from './tasks.json';

const ListFilter = ({ checked, setChecked, handleToggle, tasks, setTasks }) => {
    let filtered_tasks;

    async function fetchTasksData(status = 'all') {
        try {
            const response = await fetch('http://localhost:8000/tasks');
            if (!response.ok) {
                throw new Error('Failed to fetch tasks data');
            }
            let data = await response.json();

            if (status === 'active') {
                data = data.filter((task) => task.completed === false);
            } else if (status === 'completed') {
                data = data.filter((task) => task.completed === true);
            }
            console.log('Fetched tasks data:', data);
            setChecked(data);
            return data;
        } catch (error) {
            console.error('Error fetching tasks data:', error);
            return []; // Return empty array in case of error
        }
    }

    // useEffect(() => {
    //     filtered_tasks = fetchTasksData();
    //     // console.log('Filtered tasks:', filtered_tasks);
    //     // setTasks(filtered_tasks);

    // }, []);


    const filter = (e) => {
        const filter = e.target.innerText.toLowerCase();
        let newChecked = [];

        if (filter === 'all') {
            fetchTasksData();
        } else if (filter === 'active') {
            fetchTasksData('active');
        } else if (filter === 'completed') {
            fetchTasksData('completed');
        }

        setChecked(newChecked);
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
