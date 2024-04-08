import React, { useState } from 'react';
import TodoContainer from './TodoContainer';
import CreateContainer from './CreateContainer';

const MainContent = () => {
    const [tasks, setTasks] = useState([]);

    const onTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <>
            <header className="App-header">
                <div className="title">T O D O</div>
                <CreateContainer onTaskAdded={onTaskAdded} />
                <TodoContainer newTasks={tasks}/>
            </header>
        </>
    );
}

export default MainContent;