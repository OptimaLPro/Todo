import { useState } from 'react';
import React from 'react';
import ListItemText from '@mui/material/ListItemText';

const ListFilter = ({ setTasks, windowWidth }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filter = (e) => {
        const filter = e.target.innerText.toLowerCase();
        setSelectedFilter(filter);

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
        setTasks(storedTasks);
    };

    const handleMouseEnter = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className='list-filter'>
            <ListItemText
                primary="All"
                className={selectedFilter === 'all' ? 'glowing-hover' : ''}
                primaryTypographyProps={{
                    style: {
                        fontSize: windowWidth <= 700 ? '12px' : '16px',
                        fontFamily: 'Josefin Sans',
                        fontWeight: 'unset',
                        color: selectedFilter === 'all' ? '#4171d5' : '#6f7186',
                        marginRight: '20px',
                        cursor: 'pointer',
                        transition: 'color 0.1s ease',
                    },
                }}
                onClick={filter}
                onMouseEnter={() => handleMouseEnter('all')}
            />
            <ListItemText
                primary="Active"
                className={selectedFilter === 'active' ? 'glowing-hover' : ''}
                primaryTypographyProps={{
                    style: {
                        fontSize: windowWidth <= 700 ? '12px' : '16px',
                        fontFamily: 'Josefin Sans',
                        fontWeight: 'unset',
                        color: selectedFilter === 'active' ? '#4171d5' : '#6f7186',
                        marginRight: '20px',
                        cursor: 'pointer',
                        // transition: 'color 0.1s ease',
                    },
                }}
                onClick={filter}
                onMouseEnter={() => handleMouseEnter('active')}
            />
            <ListItemText
                primary="Completed"
                className={selectedFilter === 'completed' ? 'glowing-hover' : ''}
                primaryTypographyProps={{
                    style: {
                        fontSize: windowWidth <= 700 ? '12px' : '16px',
                        fontFamily: 'Josefin Sans',
                        fontWeight: 'unset',
                        color: selectedFilter === 'completed' ? '#4171d5' : '#6f7186',
                        cursor: 'pointer',
                        transition: 'color 0.1s ease',
                    },
                }}
                onClick={filter}
                onMouseEnter={() => handleMouseEnter('completed')}
            />
        </div>
    );
};

export default ListFilter;
