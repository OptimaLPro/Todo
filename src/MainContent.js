import React, { useState } from 'react';
import TodoContainer from './TodoContainer';
import CreateContainer from './CreateContainer';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const MainContent = () => {
    const [tasks, setTasks] = useState([]);
    const [isDarkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
    };

    const onTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <>
            <header className="App-header">
                <div className="main-wrapper">
                    <div className="title">T O D O </div>
                    <DarkModeSwitch
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={50} />
                </div>

                <div className="main-app">
                    <CreateContainer onTaskAdded={onTaskAdded} darkmode={isDarkMode} />
                    <TodoContainer newTasks={tasks} darkmode={isDarkMode} />
                </div>
            </header>
        </>
    );
}

export default MainContent;