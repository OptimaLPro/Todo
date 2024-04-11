import React, { useState } from 'react';
import TodoContainer from './TodoContainer';
import CreateContainer from './CreateContainer';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { TypeAnimation } from 'react-type-animation';


const MainContent = () => {
    const [tasks, setTasks] = useState([]);
    const [isDarkMode, setDarkMode] = React.useState(() => {
        return sessionStorage.getItem('darkmode') === 'true' ? true : false;
    });

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
        sessionStorage.setItem('darkmode', !isDarkMode);
    };

    const onTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };


    return (
        <>
            <header className="App-header">
                <div className="main-wrapper">
                    <TypeAnimation
                        cursor={false}
                        sequence={[
                            'T O D O.',
                            7000,
                            'T O D O. today.',
                            7000,
                            'T O D O: tasks.',
                            7000,
                            'T O D O. now.',
                            7000,
                            'T O D O: list.',
                            7000,
                            'T O D O: goals.',
                            7000,
                        ]}
                        speed={20}
                        style={{ fontSize: '1.5em' }}
                        repeat={Infinity}
                    />
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